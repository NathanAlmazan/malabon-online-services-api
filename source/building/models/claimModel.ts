import prismaClient from "../../config/prismaClient";

class ClaimModel {
    async setAppointment(buildingId: number, date: Date) {
        const claimAppointment = await prismaClient.buildingPermit.update({
            where: {
                buildingId: buildingId,
            },
            data: {       
                releaseDate: date
            }
        })

        return claimAppointment;
    }

    async approvedBusiness(buildingId: number, certificateFile?: string) {
        const approvedBusiness = await prismaClient.buildingPermit.update({
            where: {
                buildingId: buildingId
            },
            data: {
                approved: true,
                certificateFile: certificateFile
            }
        })

        return approvedBusiness;
    }

    async getFormsForClaim() {
        const forms = await prismaClient.buildingPermit.findMany({
            where: {
                AND: {
                    approved: true,
                    certificateFile: null
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

export default ClaimModel;