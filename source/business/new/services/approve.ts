import { NextFunction, Request, Response } from "express";
import AdminModel from "../../../accounts/models/adminModel";
import GlobalErrors from "../../../globalErrors";
import NotificationModel from "../../../notifications/notificationModel";
import ApprovalModel, { Departement } from "../models/approvalModel";

const approvalModel = new ApprovalModel();
const adminModel = new AdminModel();
const notifService = new NotificationModel();

const superUserRoles: Departement[] = ["OLBO", "CHO", "CENRO", "OCMA", "BFP", "TRSY", "PZO"];

class Approve {

    async getFormsToApprove(req: Request, res: Response, next: NextFunction) {
        const uid: string = req.user.uid;

        try {
            const adminRoles = await adminModel.getAdminAccount(uid);

            if (!adminRoles) {
                const notFoundError = new GlobalErrors.NotFoundError("Account not found.");
                return next(notFoundError);
            }

            if (!adminRoles.officer) return res.status(400).json({ message: "Account is not an admin." });

            const roles = adminRoles.superuser ? superUserRoles : adminRoles.roles.map(role => role.role as Departement);
            const formsToApprove = await approvalModel.getRegFormsToApprove(roles);

            return res.status(200).json(formsToApprove);
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async addApproval(req: Request, res: Response, next: NextFunction) {
        const uid: string = req.user.uid;
        const businessId: number | undefined = req.body.businessId;
        const approved: boolean | undefined = req.body.approved;
        const required: boolean | undefined = req.body.required;
        const type: Departement | undefined = req.body.type;
        const remarks: string | undefined = req.body.remarks;
        const fee: number | undefined = req.body.fee;

        if (!businessId || approved == undefined || required == undefined || !type || fee == undefined) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Missing approval arguments.");
            return next(nullArgumentError);
        }

        if (typeof businessId != "number" || typeof fee != "number") {
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

        const roles = adminRoles.superuser ? superUserRoles : adminRoles.roles.map(role => role.role as Departement);

        if (!roles.includes(type)) {
            const unauthorizedError = new GlobalErrors.UnauthorizedError("Unauthorized to approve this form.");
            return next(unauthorizedError);
        }

        try {

            const approval = await approvalModel.createApproval(adminRoles.userId, businessId, approved, required, type, fee, remarks);
            await notifService.createNotification("New Business Approval", `${type} department approved your new business, ${approval.business.businessName}.`, approval.business.userId);
            return res.status(201).json({ approval: approval });

        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async setTaxOrderOfPayment(req: Request, res: Response, next: NextFunction) {
        const uid: string = req.user.uid;
        const businessId: number | undefined = req.body.businessId;
        const tax: number | undefined = req.body.tax;
        const fileURL: string | undefined = req.body.fileURL;

        if (!businessId || !tax) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Missing approval arguments.");
            return next(nullArgumentError);
        }

        if (typeof businessId != "number" || typeof tax != "number") {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Business ID and Tax should be numbers.");
            return next(nullArgumentError);
        }

        const adminRoles = await adminModel.getAdminAccount(uid);

        if (!adminRoles) {
            const notFoundError = new GlobalErrors.NotFoundError("Account not found.");
            return next(notFoundError);
        }

        const roles = adminRoles.superuser ? superUserRoles : adminRoles.roles.map(role => role.role as Departement);

        if (!roles.includes("TRSY")) {
            const unauthorizedError = new GlobalErrors.UnauthorizedError("Unauthorized to approve this form.");
            return next(unauthorizedError);
        }

        try {

            await approvalModel.setTotalTax(businessId, tax);
            const taxOrderOfPayment = await approvalModel.saveTaxOrderFile(businessId, fileURL);

            if (!taxOrderOfPayment) {
                const notFoundError = new GlobalErrors.NotFoundError("Request not found.");
                return next(notFoundError);
            }

            await notifService.createNotification("New Business Approval", `Treasury posted Tax Order of Payment for your new business, ${taxOrderOfPayment.business.businessName}.`, taxOrderOfPayment.business.userId);

            return res.status(200).json({ taxOrderOfPayment: taxOrderOfPayment });

        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async getTreasuryForms(req: Request, res: Response, next: NextFunction) {
        const uid: string = req.user.uid;

        const adminRoles = await adminModel.getAdminAccount(uid);

        if (!adminRoles) {
            const notFoundError = new GlobalErrors.NotFoundError("Account not found.");
            return next(notFoundError);
        }

        const roles = adminRoles.superuser ? superUserRoles : adminRoles.roles.map(role => role.role as Departement);

        if (!roles.includes("TRSY")) {
            const unauthorizedError = new GlobalErrors.UnauthorizedError("Unauthorized to approve this form.");
            return next(unauthorizedError);
        }

        try {

            const taxOrderForms = approvalModel.getFormsForTax();

            return res.status(200).json({ taxOrderForms: taxOrderForms });

        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async getApprovedForms(req: Request, res: Response, next: NextFunction) {
        const uid: string = req.user.uid;

        const adminRoles = await adminModel.getAdminAccount(uid);

        if (!adminRoles) {
            const notFoundError = new GlobalErrors.NotFoundError("Account not found.");
            return next(notFoundError);
        }

        const roles = adminRoles.superuser ? superUserRoles : adminRoles.roles.map(role => role.role as Departement);

        if (!roles.includes("BPLO")) {
            const unauthorizedError = new GlobalErrors.UnauthorizedError("Unauthorized to get this forms.");
            return next(unauthorizedError);
        }

        try {

            const approvedForms = approvalModel.getApprovedForms();
            return res.status(200).json({ approvedForms: approvedForms });

        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async setFireTrackingNumber(req: Request, res: Response, next: NextFunction) {
        const businessId = parseInt(req.params.businessId);
        const trackingNumber = parseInt(req.body.trackingNumber);

        if (isNaN(trackingNumber) || isNaN(businessId)) {
            const forbiddenError = new GlobalErrors.ForbiddenError("The tracking number or business ID you set is forbidden.");
            return next(forbiddenError);
        }

        try {
            const trackNum = await approvalModel.setFireTrackingNumber(businessId, trackingNumber);
            return res.status(200).json(trackNum);
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async getOfficialProgress(req: Request, res: Response, next: NextFunction) {
        const uid: string = req.user.uid;

        try {
            const adminRoles = await adminModel.getAdminAccount(uid);

            if (!adminRoles) {
                const notFoundError = new GlobalErrors.NotFoundError("Account not found.");
                return next(notFoundError);
            }

            const progress = await approvalModel.getProgress(adminRoles.userId);

            return res.status(200).json(progress);
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }
}

export default Approve;