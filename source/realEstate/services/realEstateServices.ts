import { NextFunction, Request, Response } from "express";
import AccountModel from "../../accounts/models/accountModel";
import AdminModel, { Departement } from "../../accounts/models/adminModel";
import GlobalErrors from "../../globalErrors";
import NotificationModel from "../../notifications/notificationModel";
import RealEstateModel from "../models/realEstateModel";

const realEstateModel = new RealEstateModel();
const accountModel = new AccountModel();
const adminModel = new AdminModel();
const notifService = new NotificationModel();

const superUserRoles: Departement[] = ["OLBO", "CHO", "CENRO", "OCMA", "BFP", "TRSY", "PZO"];

class RealEstateServices {
    async realEstateRegister(req: Request, res: Response, next: NextFunction) {
        const ownerName: string | undefined = req.body.ownerName;
        const taxNumber: string | undefined = req.body.taxNumber;
        const receiptFile: string | undefined = req.body.receiptFile;
        const quarterPayment: boolean | undefined = req.body.quarterPayment;
        const uid: string = req.user.uid;

        if (!ownerName || !taxNumber || !receiptFile || quarterPayment == undefined) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Invalid parameters.");
            return next(nullArgumentError);
        }

        try {
            const account = await accountModel.findAccountByUid(uid);
    
            if (!account) {
                const notFoundError = new GlobalErrors.NotFoundError("Account not found.");
                return next(notFoundError);
            }

            const realEstate = await realEstateModel.registerRealEstate(account.userId, ownerName, taxNumber, receiptFile, quarterPayment);

            return res.status(200).json(realEstate);

        }  catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async getRealEstate(req: Request, res: Response, next: NextFunction) {
        const estateId: number = parseInt(req.params.estateId);
        const userUID: string = req.user.uid;
        const userRole = req.user.role;

        if (isNaN(estateId)) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Invalid parameters.");
            return next(nullArgumentError);
        }

        try {
            const form = await realEstateModel.getRealEstate(estateId);

            if (!form) {
                const notFoundError = new GlobalErrors.NotFoundError("Request form not found.");
                return next(notFoundError);
            }
            
            if (form.userAccount.uid != userUID && Boolean(userRole != "admin" && userRole != "super")) {
                const unauthorizedError = new GlobalErrors.UnauthorizedError("You are not authorized to see this form.");
                return next(unauthorizedError);
            }

            return res.status(200).json(form);

        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async getUserRequests(req: Request, res: Response, next: NextFunction) {
        const uid: string = req.user.uid;

        try {
            const account = await accountModel.findAccountByUid(uid);

            if (!account) {
                const notFoundError = new GlobalErrors.NotFoundError("User not found.");
                return next(notFoundError);
            }

            const businesses = await realEstateModel.getRealEstateRequests(account.userId);

            return res.status(200).json(businesses);
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async getRealEstateToApprove(req: Request, res: Response, next: NextFunction) {
        try {
            const realEstate = await realEstateModel.getEstateToApprove();

            return res.status(200).json(realEstate);
        }  catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async setTaxOrderOfPayment(req: Request, res: Response, next: NextFunction) {
        const uid: string = req.user.uid;
        const estateId: number | undefined = req.body.estateId;
        const tax: number | undefined = req.body.tax;
        const fileURL: string | undefined = req.body.fileURL;

        if (!estateId || !tax) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Missing approval arguments.");
            return next(nullArgumentError);
        }

        if (typeof estateId != "number" || typeof tax != "number") {
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

            await realEstateModel.setTotalTax(estateId, tax);
            const taxOrderOfPayment = await realEstateModel.setTOPFile(estateId, fileURL);
            await notifService.createNotification("Real Estate Tax", `Your real estate tax payment for ${new Date().getFullYear()} is approved. Please see details of tax payment.`, taxOrderOfPayment.accountId);

            return res.status(200).json(taxOrderOfPayment);

        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async getFormsToClaim(req: Request, res: Response, next: NextFunction) {
        try {
            const forms = await realEstateModel.getFormsToClaim();

            return res.status(200).json(forms);
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async setClaim(req: Request, res: Response, next: NextFunction) {
        const estateId: number | undefined = req.body.estateId;
        const appointment: string | undefined = req.body.appointment;
        const certificateFile: string | undefined = req.body.certificateFile;

        if (!estateId || !appointment || !certificateFile) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Missing claim arguments.");
            return next(nullArgumentError);
        }

        try {
            const claimed = await realEstateModel.setClaimRenewal(estateId, appointment, certificateFile);
            await notifService.createNotification("Real Estate Tax", `Your real estate tax payment for ${new Date().getFullYear()} was paid successfully. You can now download the official receipt.`, claimed.accountId);

            return res.status(200).json(claimed);
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }
}

export default RealEstateServices;