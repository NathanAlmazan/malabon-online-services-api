import prismaClient from "../../../config/prismaClient";
import { Departement } from "../../new/models/approvalModel";

class BusinessRenewal {
    async getBusinesses(uid: string) {
        const businesses = await prismaClient.businessRegistry.findMany({
            where: {
                AND: {
                    userAccount: {
                        uid: uid,
                    },
                    approved: true,
                }
            }
        })

        return businesses;
    }

    async requestRenewalById(userId: number, businessId: number, receiptNumber: string, receiptFile: string, paymentType: boolean) {
        const businessRenewal = await prismaClient.businessRenewal.create({
            data: {
                businessId: businessId,
                receiptNumber: receiptNumber,
                receiptFile: receiptFile,
                quarterly: paymentType,
                accountId: userId
            }
        })

        return businessRenewal;
    }

    async getRenewBusinessRequest(renewalId: number) {
        const renewBusiness = await prismaClient.businessRenewal.findUnique({
            where: {
                renewalId: renewalId
            },
            include: {
                business: true,
                payments: true,
                userAccount: true
            }
        })

        return renewBusiness;
    }

    async requestRenewalByCredentials(userId: number, permitId: string, receipt: string, receiptFile: string, paymentType: boolean, businessName?: string) {
        const businessRenewal = await prismaClient.businessRenewal.create({
            data: {
                permitNumber: permitId,
                receiptNumber: receipt,
                receiptFile: receiptFile,
                businessName: businessName,
                quarterly: paymentType,
                accountId: userId
            }
        })

        return businessRenewal;
    }

    async getRenewalToApprove() {
        const businessRenew = await prismaClient.businessRenewal.findMany({
            where: {
                completed: false
            },
            include: {
                business: true,
                payments: true
            }
        })

        return businessRenew.filter(business => business.topFile == null);
    }

    async setTotalTax(businessId: number, tax: number) {
        const businessTax = await prismaClient.businessPayments.create({
            data: {
                renewalId: businessId,
                newBusiness: false,
                amount: tax
            }
        })

        return businessTax;
    }

    async setTOPFile(businessId: number, fileURL?: string) {
        const topFile = await prismaClient.businessRenewal.update({
            where: {
                renewalId: businessId
            },
            data: {
                topFile: fileURL
            }
        })

        return topFile;
    }

    async getRenewalRequest(userId: number) {
        const businessRenew = await prismaClient.businessRenewal.findMany({
            where: {
                AND: {
                    accountId: userId
                }
            },
            include: {
                business: true
            }
        })

        return businessRenew;
    }

    async setClaimRenewal(renewalId: number, appointment: string, certificateFile: string) {
        const claimed = await prismaClient.businessRenewal.update({
            where: {
                renewalId: renewalId
            },
            data: {
                appointment: new Date(appointment),
                certificateFile: certificateFile
            }
        })

        return claimed;
    }

    async getFormsToClaim() {
        const forms = await prismaClient.businessRenewal.findMany({
            where: {
                completed: true
            },
            include: {
                business: true,
                payments: true
            }
        })

        return forms.filter(form => form.certificateFile == null);
    }
}

export default BusinessRenewal;