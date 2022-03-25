import { NextFunction, Request, Response } from "express";
import AccountModel from "../../accounts/models/accountModel";
import GlobalErrors from "../../globalErrors";
import Buildingregister, { BuildingPermitType } from "../models/registerModel";

const registerModel = new Buildingregister();
const accountModel = new AccountModel();

class BuildingRegisterServices {
    
    async registerNewBuilding(req: Request, res: Response, next: NextFunction) {
        const buildingInfo: BuildingPermitType | undefined = req.body;
        const userUID = req.user.uid;

        if (!buildingInfo) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Missing form data.");
            return next(nullArgumentError);
        }

        try {
            const account = await accountModel.findAccountByUid(userUID);

            if (!account) {
                const notFoundError = new GlobalErrors.NotFoundError("Account not found.");
                return next(notFoundError);
            }
            
            const newBuilding = await registerModel.registerNewBuilding(buildingInfo, account.userId);

            return res.status(201).json(newBuilding);
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async getSubmittedForm(req: Request, res: Response, next: NextFunction) {
        const buildingId: number = parseInt(req.params.id);
        const userUID: string = req.user.uid;
        const userRole = req.user.role;

        if (isNaN(buildingId)) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Invalid parameters.");
            return next(nullArgumentError);
        }

        try {
            const form = await registerModel.getBuildingForm(buildingId);

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

    async getUserRequests(req: Request, res: Response, next: NextFunction) {
        const userUID = req.user.uid;
        try {
            const account = await accountModel.findAccountByUid(userUID);

            if (!account) {
                const notFoundError = new GlobalErrors.NotFoundError("Account not found.");
                return next(notFoundError);
            }
            
            const requests = await registerModel.getUserForms(account.userId);

            return res.status(201).json(requests);
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }
}

export default BuildingRegisterServices;