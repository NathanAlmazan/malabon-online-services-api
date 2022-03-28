import prismaClient from "../../config/prismaClient";

class RealEstateModel {
    async registerRealEstate(userId: number, ownerName: string, taxNumber: string, receiptFile: string, paymentType: boolean) {
        const realEstate = await prismaClient.realEstate.create({
            data: {
                accountId: userId, 
                ownerName: ownerName,
                declarationNum: taxNumber,
                receiptFile: receiptFile,
                quarterly: paymentType
            }
        })

        return realEstate;
    }

    async getRealEstate(estateId: number) {
        const realEstate = await prismaClient.realEstate.findUnique({
            where: {
                estateId: estateId,
            },
            include: {
                payments: true,
                userAccount: true
            }
        })

        return realEstate;
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

    async getEstateToApprove() {
        const realEstate = await prismaClient.realEstate.findMany({
            where: {
                AND: {
                    completed: false,
                    topFile: null
                }
            },
            include: {
                payments: true
            }
        })

        return realEstate;
    }

    async setTotalTax(estateId: number, tax: number) {
        const estateTax = await prismaClient.realEstatePayments.create({
            data: {
                estateId: estateId,
                amount: tax
            }
        })

        return estateTax;
    }

    async setTOPFile(estateId: number, fileURL?: string) {
        const topFile = await prismaClient.realEstate.update({
            where: {
                estateId: estateId
            },
            data: {
                topFile: fileURL
            },
            include: {
                payments: true
            }
        })

        return topFile;
    }

    async getRealEstateRequests(userId: number) {
        const realEstate = await prismaClient.realEstate.findMany({
            where: {
                accountId: userId
            },
            include: {
                payments: true
            }
        })

        return realEstate;
    }

    async setClaimRenewal(estateId: number, appointment: string, certificateFile: string) {
        const claimed = await prismaClient.realEstate.update({
            where: {
                estateId: estateId
            },
            data: {
                appointment: new Date(appointment),
                certificateFile: certificateFile
            }
        })

        return claimed;
    }

    async getFormsToClaim() {
        const forms = await prismaClient.realEstate.findMany({
            where: {
                AND: {
                    completed: true,
                    certificateFile: null
                }
            },
            include: {
                payments: true
            }
        })

        return forms;
    }
}

export default RealEstateModel;