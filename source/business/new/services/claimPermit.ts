import { NextFunction, Request, Response } from "express";
import GlobalErrors from "../../../globalErrors";
import ClaimModel from "../models/claimModel";

const claimModel = new ClaimModel();

class ClaimPermit {
    async setClaimSchedule(req: Request, res: Response, next: NextFunction) {
        const businessId: number | undefined = req.body.businessId;
        const schedule: string | undefined = req.body.schedule;
        const certificateId: string | undefined = req.body.certificateId;

        if (!businessId || !schedule || !certificateId) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Business ID and valid Payment ID is required.");
            return next(nullArgumentError);
        }

        try {
            const claimSchedule = await claimModel.setAppointment(businessId, new Date(schedule));
            await claimModel.approvedBusiness(businessId, certificateId);
            
            return res.status(201).json(claimSchedule);
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async setFinishedAppointment(req: Request, res: Response, next: NextFunction) {
        const appointmentId = parseInt(req.params.paymentId);

        if (isNaN(appointmentId)) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Invalid Payment ID.");
            return next(nullArgumentError);
        }

        try {
            const finishedAppointment = await claimModel.setAppointmentFinished(appointmentId);

            return res.status(200).json(finishedAppointment);
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async getFormsForClaim(req: Request, res: Response, next: NextFunction) {
        try {
            const forms = await claimModel.getFormsForClaim();

            return res.status(200).json(forms);
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }
}

export default ClaimPermit;