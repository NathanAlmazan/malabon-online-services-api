import { NextFunction, Request, Response } from "express";
import AdminModel from "../../accounts/models/adminModel";
import GlobalErrors from "../../globalErrors";
import BuildingApprovalModel from "../models/approvalModel";
import ClaimModel from "../models/claimModel";

const approveModel = new BuildingApprovalModel();
const adminModel = new AdminModel();
const claimModel = new ClaimModel();

export const superUserRoles = ["FENCING", "ARCHITECTURAL", "STRUCTURAL", "ELECTRICAL", "MECHANICAL", "BFP", "SANITARY", "PLUMBING", "INTERIOR", "ELECTRONICS", "TRSY"];

class BuildingApproveService {
    async getFormsToApprove(req: Request, res: Response, next: NextFunction) {
        const uid: string = req.user.uid;

        try {
            const adminRoles = await adminModel.getAdminAccount(uid);

            if (!adminRoles) {
                const notFoundError = new GlobalErrors.NotFoundError("Account not found.");
                return next(notFoundError);
            }

            if (!adminRoles.officer) return res.status(400).json({ message: "Account is not an admin." });

            if (adminRoles.superuser || adminRoles.roles.map(role => role.role as string).includes("BUILDING OFFICIAL")) {
                const forms = await approveModel.getFormsToApprove();

                return res.status(200).json(forms);
            }

            const unauthorizedError = new GlobalErrors.UnauthorizedError("Unauthorized request.");
            return next(unauthorizedError);
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async addApproval(req: Request, res: Response, next: NextFunction) {
        const uid: string = req.user.uid;
        const buildingId: number | undefined = req.body.buildingId;
        const approved: boolean | undefined = req.body.approved;
        const required: boolean | undefined = req.body.required;
        const type: string | undefined = req.body.type;
        const remarks: string | undefined = req.body.remarks;
        const fee: number | undefined = req.body.fee;

        if (!buildingId || approved == undefined || required == undefined || !type || fee == undefined) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Missing approval arguments.");
            return next(nullArgumentError);
        }

        if (typeof buildingId != "number" || typeof fee != "number") {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Business ID and Fee should be numbers.");
            return next(nullArgumentError);
        }

        if (typeof required != "boolean" || typeof approved != "boolean") {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Required and Approved arguments must be boolean.");
            return next(nullArgumentError);
        }

        const adminRoles = await adminModel.getAdminAccount(uid);

        if (!adminRoles) {
            const notFoundError = new GlobalErrors.NotFoundError("Account not found.");
            return next(notFoundError);
        }

        const roles = adminRoles.superuser ? superUserRoles : adminRoles.roles.map(role => role.role);

        if (!roles.includes(type)) {
            const unauthorizedError = new GlobalErrors.UnauthorizedError("Unauthorized to approve this form.");
            return next(unauthorizedError);
        }

        try {

            const approval = approveModel.createApproval(adminRoles.userId, buildingId, approved, required, type, fee, remarks);
            return res.status(201).json({ approval: approval });

        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async setTaxOrderOfPayment(req: Request, res: Response, next: NextFunction) {
        const uid: string = req.user.uid;
        const buildingId: number | undefined = req.body.buildingId;
        const tax: number | undefined = req.body.tax;
        const fileURL: string | undefined = req.body.fileURL;

        if (!buildingId || !tax) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Missing approval arguments.");
            return next(nullArgumentError);
        }

        if (typeof buildingId != "number" || typeof tax != "number") {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Business ID and Tax should be numbers.");
            return next(nullArgumentError);
        }

        const adminRoles = await adminModel.getAdminAccount(uid);

        if (!adminRoles) {
            const notFoundError = new GlobalErrors.NotFoundError("Account not found.");
            return next(notFoundError);
        }

        const roles = adminRoles.superuser ? superUserRoles : adminRoles.roles.map(role => role.role);

        if (!roles.includes("TRSY")) {
            const unauthorizedError = new GlobalErrors.UnauthorizedError("Unauthorized to approve this form.");
            return next(unauthorizedError);
        }

        try {

            await approveModel.setTotalTax(buildingId, tax);
            const taxOrderOfPayment = approveModel.saveTaxOrderFile(buildingId, fileURL);

            return res.status(200).json({ taxOrderOfPayment: taxOrderOfPayment });

        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async setFireTrackingNumber(req: Request, res: Response, next: NextFunction) {
        const buildingId = parseInt(req.params.buildingId);
        const trackingNumber = parseInt(req.body.trackingNumber);

        if (isNaN(trackingNumber) || isNaN(buildingId)) {
            const forbiddenError = new GlobalErrors.ForbiddenError("The tracking number or business ID you set is forbidden.");
            return next(forbiddenError);
        }

        try {
            const trackNum = await approveModel.setFireTrackingNumber(buildingId, trackingNumber);
            return res.status(200).json(trackNum);
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async setClaimSchedule(req: Request, res: Response, next: NextFunction) {
        const buildingId: number | undefined = req.body.buildingId;
        const schedule: string | undefined = req.body.schedule;
        const certificateFile: string | undefined = req.body.certificateFile;

        if (!buildingId || !schedule) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Building ID and valid Payment ID is required.");
            return next(nullArgumentError);
        }

        try {
            const claimSchedule = await claimModel.setAppointment(buildingId, new Date(schedule));
            await claimModel.approvedBusiness(buildingId, certificateFile);
            
            return res.status(201).json(claimSchedule);
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

export default BuildingApproveService;