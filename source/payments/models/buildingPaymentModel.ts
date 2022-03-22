import prismaClient from "../../config/prismaClient";


class BuildingPaymentModel {
    async getPaymentBill(paymentId: number) {
        const bill = await prismaClient.buildingPayments.findUnique({
            where: {
                paymentId: paymentId
            }
        })

        return bill;
    }

    async uploadBankReceipt(paymentId: number, receipt: string) {
        const uploadReceeipt = await prismaClient.buildingPayments.update({
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
        const paypalPayment = await prismaClient.buildingPayments.update({
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

    async confirmPayment(buildingId: number) {
        const confirmedPayment = await prismaClient.buildingPermit.update({
            where: {
                buildingId: buildingId
            },
            data: {
                approved: true
            }
        })

        return confirmedPayment;
    }

    async rejectPayment(paymentId: number, rejectMessage: string) {
        const rejectedpayment = await prismaClient.buildingPayments.update({
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
        const forms = await prismaClient.buildingPermit.findMany({
            where: {
                AND: {
                    approved: false, 
                    payments: {
                        some: {
                            paid: true
                        }
                    }
                }
            },
            include: {
                approvals: {
                    select: {
                        approvalFee: true,
                        approvalId: true,
                        approvalType: true,
                        approved: true,
                        approvedAt: true,
                        remarks: true,
                        required: true,
                        official: {
                            select: {
                                firstName: true,
                                lastName: true
                            }
                        },
                    }
                },
                files: true,
                payments: true,
                userAccount: true
            }
        })

        return forms;
    }

}

export default BuildingPaymentModel;