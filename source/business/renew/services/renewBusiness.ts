import { NextFunction, Request, Response } from "express";
import AccountModel from "../../../accounts/models/accountModel";
import RegisterModel from "../../new/models/registerModel";
import GlobalErrors from "../../../globalErrors";
import BusinessRenewal from "../models/businessModel";
import { Departement } from "../../new/models/approvalModel";
import AdminModel from "../../../accounts/models/adminModel";

const businessModel = new BusinessRenewal();
const accountModel = new AccountModel();
const registerModel = new RegisterModel();
const adminModel = new AdminModel();

const superUserRoles: Departement[] = ["OLBO", "CHO", "CENRO", "OCMA", "BFP", "TRSY", "PZO"];

class RenewBusiness {
    async getAvailableBusiness(req: Request, res: Response, next: NextFunction) {
        const uid: string = req.user.uid;

        try {
            const account = await accountModel.findAccountByUid(uid);

            if (!account) {
                const notFoundError = new GlobalErrors.NotFoundError("User not found.");
                return next(notFoundError);
            }

            const businesses = await businessModel.getBusinesses(uid);

            return res.status(200).json(businesses);
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async getRenewBusinessRequest(req: Request, res: Response, next: NextFunction) {
        const renewId: number = parseInt(req.params.renewId);
        const userUID: string = req.user.uid;
        const userRole = req.user.role;

        if (isNaN(renewId)) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Invalid parameters.");
            return next(nullArgumentError);
        }

        try {
            const form = await businessModel.getRenewBusinessRequest(renewId);

            if (!form) {
                const notFoundError = new GlobalErrors.NotFoundError("Registration form not found.");
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

    async renewBusinessById(req: Request, res: Response, next: NextFunction) {
        const businessId: number = parseInt(req.body.businessId);
        const receiptNumber: string | undefined = req.body.receiptNumber;
        const receiptFile: string | undefined = req.body.receiptFile;
        const quarterPayment: boolean | undefined = req.body.quarterPayment;
        const uid: string = req.user.uid;

        if (isNaN(businessId) || !receiptNumber || !receiptFile || !quarterPayment) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Invalid parameters.");
            return next(nullArgumentError);
        }

        try {
            const account = await accountModel.findAccountByUid(uid);
            const business = await registerModel.getRegistrationForm(businessId);

            if (!business) {
                const notFoundError = new GlobalErrors.NotFoundError("Business not found.");
                return next(notFoundError);
            }
            if (!account) {
                const notFoundError = new GlobalErrors.NotFoundError("Account not found.");
                return next(notFoundError);
            }

            const renewBusiness = await businessModel.requestRenewalById(account.userId, business.businessId, receiptNumber, receiptFile, quarterPayment);

            return res.status(200).json(renewBusiness);

        }  catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async renewBusinessByCredentials(req: Request, res: Response, next: NextFunction) {
        const permitNumber: string | undefined = req.body.permitNumber;
        const receiptNumber: string | undefined = req.body.receiptNumber;
        const receiptFile: string | undefined = req.body.receiptFile;
        const businessName: string | undefined = req.body.businessName;
        const quarterPayment: boolean | undefined = req.body.quarterPayment;
        const uid: string = req.user.uid;

        if (!permitNumber || !receiptNumber || !receiptFile || !quarterPayment) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Incomplete parameters.");
            return next(nullArgumentError);
        }

        try {
            const account = await accountModel.findAccountByUid(uid);

            if (!account) {
                const notFoundError = new GlobalErrors.NotFoundError("Account not found.");
                return next(notFoundError);
            }

            const renewBusiness = await businessModel.requestRenewalByCredentials(account.userId, permitNumber, receiptNumber, receiptFile, quarterPayment, businessName);
            return res.status(200).json(renewBusiness);

        }  catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async getBusinessTorenew(req: Request, res: Response, next: NextFunction) {
        try {
            const businessRenew = await businessModel.getRenewalToApprove();

            return res.status(200).json(businessRenew);
        }  catch (error) {
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

            await businessModel.setTotalTax(businessId, tax);
            const taxOrderOfPayment = businessModel.setTOPFile(businessId, fileURL);

            return res.status(200).json({ taxOrderOfPayment: taxOrderOfPayment });

        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async getUserRequest(req: Request, res: Response, next: NextFunction) {
        const uid: string = req.user.uid;

        try {
            const account = await accountModel.findAccountByUid(uid);

            if (!account) {
                const notFoundError = new GlobalErrors.NotFoundError("User not found.");
                return next(notFoundError);
            }

            const businesses = await businessModel.getRenewalRequest(account.userId);

            return res.status(200).json(businesses);
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async getFormsToClaim(req: Request, res: Response, next: NextFunction) {
        try {
            const forms = await businessModel.getFormsToClaim();

            return res.status(200).json(forms);
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async setClaim(req: Request, res: Response, next: NextFunction) {
        const renewalId: number | undefined = req.body.renewalId;
        const appointment: string | undefined = req.body.appointment;
        const certificateFile: string | undefined = req.body.certificateFile;

        if (!renewalId || !appointment || !certificateFile) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Missing claim arguments.");
            return next(nullArgumentError);
        }

        try {
            const claimed = await businessModel.setClaimRenewal(renewalId, appointment, certificateFile);

            return res.status(200).json(claimed);
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }
}


export default RenewBusiness;