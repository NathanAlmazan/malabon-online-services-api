import prismaClient from "../../config/prismaClient";


class RealEstatePaymentModel {
    async getPaymentBill(paymentId: number) {
        const bill = await prismaClient.realEstatePayments.findUnique({
            where: {
                paymentId: paymentId
            }
        })

        return bill;
    }

    async uploadBankReceipt(paymentId: number, receipt: string) {
        const uploadReceeipt = await prismaClient.realEstatePayments.update({
            where: {
                paymentId: paymentId
            },
            data: {
                receipt: receipt,
                paid: true,
                paidAt: new Date()
            }
        })

        return uploadReceeipt;
    }

    async uploadPaypalPayent(paymentId: number, transactionId: string) {
        const paypalPayment = await prismaClient.realEstatePayments.update({
            where: {
                paymentId: paymentId
            },
            data: {
                transactionId: transactionId,
                paid: true,
                paidAt: new Date()
            }
        })

        return paypalPayment;
    } 

    async confirmPayment(estateId: number) {
        const confirmedPayment = await prismaClient.realEstate.update({
            where: {
                estateId: estateId
            },
            data: {
                completed: true
            }
        })

        return confirmedPayment;
    }

    async rejectPayment(paymentId: number, rejectMessage: string) {
        const rejectedpayment = await prismaClient.realEstatePayments.update({
            where: {
                paymentId: paymentId
            },
            data: {
                paid: false,
                rejected: true,
                rejectMessage: rejectMessage
            }
        })

        return rejectedpayment;
    }

    async getFormsForVerification() {
        const forms = await prismaClient.realEstate.findMany({
            where: {
                AND: {
                    completed: false, 
                    payments: {
                        some: {
                            paid: true
                        }
                    }
                }
            },
            include: {
                payments: true,
                userAccount: true
            }
        })

        return forms;
    }

}

export default RealEstatePaymentModel;