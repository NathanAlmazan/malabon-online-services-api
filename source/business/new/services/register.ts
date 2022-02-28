import { NextFunction, Request, Response } from "express";
import AccountModel from "../../../accounts/models/accountModel";
import GlobalErrors from "../../../globalErrors";
import RegisterModel, { RegisterFormInterface, RegisterFormKeys } from "../models/registerModel";

const registerModel = new RegisterModel();
const accountModel = new AccountModel();

class Register {

    async submitForm(req: Request, res: Response, next: NextFunction) {
        const formData: RegisterFormInterface | undefined = req.body;
        const userUID: string = req.user.uid;

        if (!formData) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Missing form data.");
            return next(nullArgumentError);
        }

        const formKeys = Object.keys(formData);

        for (let i = 0; i < RegisterFormKeys.length; i++) {
            if (!formKeys.includes(RegisterFormKeys[i])) {
                const nullArgumentError = new GlobalErrors.NullArgumentError(RegisterFormKeys[i] + " is missing in form data.");
                return next(nullArgumentError);
            }
        }

        try {
            const account = await accountModel.findAccountByUid(userUID);

            if (!account) {
                const notFoundError = new GlobalErrors.NotFoundError("Account not found.");
                return next(notFoundError);
            }

            const submittedForm = await registerModel.saveRegistrationForm(formData, account.userId);
            const savedForm = await registerModel.getRegistrationForm(submittedForm);

            return res.status(201).json({ submittedForm: savedForm });

        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async getSubmittedForm(req: Request, res: Response, next: NextFunction) {
        const businessId: number = parseInt(req.params.id);
        const userUID: string = req.user.uid;
        const userRole = req.user.role;

        if (isNaN(businessId)) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Invalid parameters.");
            return next(nullArgumentError);
        }

        try {
            const form = await registerModel.getRegistrationForm(businessId);

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

    async getUserApplications(req: Request, res: Response, next: NextFunction) {
        const userUID = req.user.uid;

        try {
            const account = await accountModel.findAccountByUid(userUID);

            if (!account) {
                const notFoundError = new GlobalErrors.NotFoundError("Account not found.");
                return next(notFoundError);
            }

            const userApplications = await registerModel.getUserApplications(account.userId);

            return res.status(200).json(userApplications);
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

}

export default Register;