import prismaClient from "../../../config/prismaClient";

class ClaimModel {
    async setAppointment(businessId: number, date: Date) {
        const claimAppointment = await prismaClient.businessAppointment.create({
            data: {
                businessId: businessId,
                schedule: date
            }
        })

        return claimAppointment;
    }

    async setAppointmentFinished(appointmentId: number) {
        const finishAppointment = await prismaClient.businessAppointment.update({
            where: {
                appointmentId: appointmentId
            },
            data: {
                claimed: true
            }
        })

        return finishAppointment;
    }

    async approvedBusiness(businessId: number, certificateId: string, certificateFile?: string) {
        const approvedBusiness = await prismaClient.businessRegistry.update({
            where: {
                businessId: businessId
            },
            data: {
                approved: true,
                certificateId: certificateId,
                certificateFile: certificateFile
            }
        })

        return approvedBusiness;
    }

    async getFormsForClaim() {
        const forms = await prismaClient.businessRegistry.findMany({
            where: {
                approved: true
            },
            include: {
                approvals: true,
                addresses: true,
                payments: true
            }
        })

        const filteredForms = forms.filter(form => form.certificateId == null);

        return filteredForms;
    }
}

export default ClaimModel;