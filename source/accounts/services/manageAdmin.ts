import { Accounts } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import ApprovalModel from "../../business/new/models/approvalModel";
import firebaseAdminAuth from "../../config/firebaseAuth";
import GlobalErrors from "../../globalErrors";
import AccountModel from "../models/accountModel";
import AdminModel, { Departement } from "../models/adminModel";

const adminModel = new AdminModel();
const accountModel = new AccountModel();
const approveModel = new ApprovalModel();

class ManageAdmin {

    async createAdminAccount(req: Request, res: Response, next: NextFunction) {
        const uid: string | undefined = req.body.uid;
        const roles: Departement[] | undefined = req.body.roles;

        if (req.user.role != "super") {
            const unauthorizedError = new GlobalErrors.UnauthorizedError("Unauthorize to perform this action.");
            return next(unauthorizedError);
        }

        if (!uid || !roles) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Incomplete arguments.");
            return next(nullArgumentError);
        }

        try {
            const account = await accountModel.findAccountByUid(uid);

            if (!account) {
                const notFoundError = new GlobalErrors.NotFoundError("Account does not exist.");
                return next(notFoundError);
            }

            if (account.officer) return res.status(400).json({ message: "Account is already an admin." });

            const adminAccount = await adminModel.createAdmin(uid, roles);
            await firebaseAdminAuth.setCustomUserClaims(uid, { role: "admin" });

            return res.status(201).json({ adminAccount: adminAccount });

        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async updateAdminAccount(req: Request, res: Response, next: NextFunction) {
        const uid: string | undefined = req.body.uid;
        const roles: Departement[] | undefined = req.body.roles;

        if (req.user.role != "super") {
            const unauthorizedError = new GlobalErrors.UnauthorizedError("Unauthorize to perform this action.");
            return next(unauthorizedError);
        }

        if (!uid || !roles) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Incomplete arguments.");
            return next(nullArgumentError);
        }

        try {
            const account = await accountModel.findAccountByUid(uid);

            if (!account) {
                const notFoundError = new GlobalErrors.NotFoundError("Account does not exist.");
                return next(notFoundError);
            }

            if (!account.officer) return res.status(400).json({ message: "Account is not an admin." });

            const adminAccount = await adminModel.updateAdminRoles(uid, roles);

            return res.status(201).json({ adminAccount: adminAccount });

        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async createSuperuserAccount(req: Request, res: Response, next: NextFunction) {
        const uid: string = req.params.uid;

        if (req.user.role != "super") {
            const unauthorizedError = new GlobalErrors.UnauthorizedError("Unauthorize to perform this action.");
            return next(unauthorizedError);
        }

        try {
            const account = await accountModel.findAccountByUid(uid);

            if (!account) {
                const notFoundError = new GlobalErrors.NotFoundError("Account does not exist.");
                return next(notFoundError);
            }

            if (account.superuser) return res.status(400).json({ message: "Account is already a superuser." });

            const adminAccount = await adminModel.createSuperuser(uid);
            await firebaseAdminAuth.setCustomUserClaims(uid, { role: "super" });

            return res.status(201).json({ adminAccount: adminAccount });

        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async getAdminAccount(req: Request, res: Response, next: NextFunction) {
        const uid: string = req.user.uid;

        if (req.user.uid != uid && req.user.role != "super") {
            const unauthorizedError = new GlobalErrors.UnauthorizedError("Unauthorize to perform this action.");
            return next(unauthorizedError);
        }

        try {
            const adminAccount = await adminModel.getAdminAccount(uid);

            if (!adminAccount) {
                const notFoundError = new GlobalErrors.NotFoundError("Account does not exist.");
                return next(notFoundError);
            }

            if (!adminAccount.officer) return res.status(400).json({ message: "Account is not an admin." });

            const departments: string[] = ["OLBO", "CHO", "CENRO", "OCMA", "BFP", "PZO", "TRSY", "BPLO", "FENCING", "ARCHITECTURAL", "STRUCTURAL", "ELECTRICAL", "MECHANICAL", "SANITARY", "PLUMBING", "INTERIOR", "ELECTRONICS"];
            const adminRoles = adminAccount.superuser ? departments : adminAccount.roles.map(role => role.role)

            return res.status(201).json({ adminAccount: adminAccount, roles: adminRoles });

        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async getUserRoles(req: Request, res: Response, next: NextFunction) {
        const uid: string = req.user.uid;

        try {
            const adminAccount = await adminModel.getAdminAccount(uid);

            if (!adminAccount || !adminAccount.officer) {
                return res.status(201).json({ roles: ['citizen'] });
            }

            const departments: Departement[] = ["OLBO", "CHO", "CENRO", "OCMA", "BFP", "PZO", "TRSY", "BPLO"];
            const adminRoles = adminAccount.superuser ? departments : adminAccount.roles.map(role => role.role)

            return res.status(201).json({ roles: adminRoles });

        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async removeAdminAccount(req: Request, res: Response, next: NextFunction) {
        const uid: string = req.params.uid;

        if (req.user.role != "super") {
            const unauthorizedError = new GlobalErrors.UnauthorizedError("Unauthorize to perform this action.");
            return next(unauthorizedError);
        }

        try {
            const account = await accountModel.findAccountByUid(uid);

            if (!account) {
                const notFoundError = new GlobalErrors.NotFoundError("Account does not exist.");
                return next(notFoundError);
            }

            if (!account.officer) return res.status(400).json({ message: "Account is not an admin." });

            const adminAccount = await adminModel.removeAdmin(uid);
            await firebaseAdminAuth.setCustomUserClaims(uid, { role: 'citizen' });

            return res.status(201).json({ adminAccount: adminAccount });

        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async removeSuperuserAccount(req: Request, res: Response, next: NextFunction) {
        const uid: string = req.params.uid;

        if (req.user.role != "super") {
            const unauthorizedError = new GlobalErrors.UnauthorizedError("Unauthorize to perform this action.");
            return next(unauthorizedError);
        }

        try {
            const account = await accountModel.findAccountByUid(uid);

            if (!account) {
                const notFoundError = new GlobalErrors.NotFoundError("Account does not exist.");
                return next(notFoundError);
            }

            if (!account.superuser) return res.status(400).json({ message: "Account is not a superuser." });

            const adminAccount = await adminModel.removeSuperuser(uid);
            await firebaseAdminAuth.setCustomUserClaims(uid, { role: 'admin' });

            return res.status(201).json({ adminAccount: adminAccount });

        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async manageAccounts(req: Request, res: Response, next: NextFunction) {
        const email: string = req.params.email;

        if (req.user.role != "super") {
            const unauthorizedError = new GlobalErrors.UnauthorizedError("Unauthorize to perform this action.");
            return next(unauthorizedError);
        }

        try {
            const adminAccount = await adminModel.getAdminAccountByEmail(email);

            if (!adminAccount) {
                const notFoundError = new GlobalErrors.NotFoundError("Account does not exist.");
                return next(notFoundError);
            }

            const departments: string[] = ["OLBO", "CHO", "CENRO", "OCMA", "BFP", "PZO", "TRSY", "BPLO", "FENCING", "ARCHITECTURAL", "STRUCTURAL", "ELECTRICAL", "MECHANICAL", "SANITARY", "PLUMBING", "INTERIOR", "ELECTRONICS"];
            const adminRoles = adminAccount.superuser ? departments : adminAccount.roles.map(role => role.role);
            const assessedForms = await adminModel.getAdminApprovals(adminAccount.userId);
            const forApproval = await approveModel.getWeeklyRequest(adminRoles as Departement[]);

            const firebaseUser = await firebaseAdminAuth.getUser(adminAccount.uid);

            return res.status(201).json({ adminAccount: adminAccount, roles: adminRoles, assessed: assessedForms.length, forAssess: forApproval.length, image: firebaseUser.photoURL });

        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async manageAllAdminAccounts(req: Request, res: Response, next: NextFunction) {
        try {
            const adminAccount = await adminModel.getAllAdminAccount();

            let admins: {
                adminAccount: Accounts,
                roles: any,
                assessed: number,
                image: string | undefined
            }[] = [];

            for (let x=0; x < adminAccount.length; x++) {
                const currentAccount = adminAccount[x];
                const departments: string[] = ["OLBO", "CHO", "CENRO", "OCMA", "BFP", "PZO", "TRSY", "BPLO", "FENCING", "ARCHITECTURAL", "STRUCTURAL", "ELECTRICAL", "MECHANICAL", "SANITARY", "PLUMBING", "INTERIOR", "ELECTRONICS"];
                const adminRoles = currentAccount.superuser ? departments : currentAccount.roles.map(role => role.role);
                const assessedForms = await adminModel.getAdminApprovals(currentAccount.userId);
    
                const firebaseUser = await firebaseAdminAuth.getUser(currentAccount.uid);

                admins.push({
                    adminAccount: currentAccount, roles: adminRoles, assessed: assessedForms.length, image: firebaseUser.photoURL
                })
            }

            return res.status(201).json(admins);

        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

}

export default ManageAdmin;