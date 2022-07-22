import prismaClient from "../../config/prismaClient";

export type BuildingDepartment = "BUILDING OFFICIAL" | "BFP" | "TRSY" | "BPLO";

class BuildingApprovalModel {
    async getFormsToApprove() {
        const buildingApprove = await prismaClient.buildingPermit.findMany({
            where: {
                approved: false
                
            },
            include: {
                approvals: true,
                payments: true
            }
        })

        return buildingApprove;
    }

    async createApproval(accountId: number, building: number, approved: boolean, required: boolean, type: string, fee: number, remarks?: string) {
        const approval = await prismaClient.buildingApproval.create({
            data: {
                approvalType: type,
                approvalFee: fee,
                approved: approved,
                required: required,
                remarks: remarks,
                officialId: accountId,
                buildingId: building
            },
            include: {
                building: true
            }
        })

        return approval;
    }

    async setTotalTax(buildingId: number, tax: number) {
        const businessTax = await prismaClient.buildingPayments.create({
            data: {
                buildingId: buildingId,
                amount: tax
            }
        })

        return businessTax;
    }

    async saveTaxOrderFile(buildingId: number, fileURL?: string) {
        if (fileURL) {
            const taxOrderFile = await prismaClient.buildingFiles.create({
                data: {
                    documentType: "Tax Order of Payment",
                    fileName:  "Tax Order of Payment",
                    fileURL: fileURL,
                    buildingId: buildingId
                },
                include: {
                    building: true
                }
            })
    
            return taxOrderFile;
        }
    }

    async setFireTrackingNumber(buildingId: number, trackingNumber: number) {
        const trackNumber = await prismaClient.buildingPermit.update({
            where: {
                buildingId: buildingId,
            },
            data: {
                trackNumber: trackingNumber
            }
        });

        return trackNumber;
    }
}

export default BuildingApprovalModel;