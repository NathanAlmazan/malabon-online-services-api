import { BusinessPayments, BusinessRegistry } from "@prisma/client";
import prismaClient from "../../config/prismaClient";



class PaymentModel {

    async getPaymentBill(paymentId: number) {
        const bill = await prismaClient.businessPayments.findUnique({
            where: {
                paymentId: paymentId
            }
        })

        return bill;
    }

    async uploadBankReceipt(paymentId: number, receipt: string) {
        const uploadReceeipt = await prismaClient.businessPayments.update({
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
        const paypalPayment = await prismaClient.businessPayments.update({
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

    async confirmPayment(businessId: number) {
        const confirmedPayment = await prismaClient.businessRegistry.update({
            where: {
                businessId: businessId
            },
            data: {
                approved: true
            }
        })

        return confirmedPayment;
    }

    async getBankReceiptForms() {
        const businessess = await prismaClient.businessRegistry.findMany({
            where: {
               approved: false
            },
            include: {
                payments: true
            }
        })

        let businessPaid: (BusinessRegistry & {
            payments: BusinessPayments[];
        })[] = [];

        businessess.forEach(business => {
            let count = 0;

            business.payments.forEach(payment => {
                if (payment.receipt != null) {
                    count++;
                }
            })

            if (count > 0) {
                businessPaid.push(business);
            }
        })

        return businessPaid;
    }

    async rejectPayment(paymentId: number, rejectMessage: string) {
        const rejectedpayment = await prismaClient.businessPayments.update({
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
        const forms = await prismaClient.businessRegistry.findMany({
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
                approvals: true,
                addresses: true,
                payments: true
            }
        })

        return forms;
    }
}

export default PaymentModel;