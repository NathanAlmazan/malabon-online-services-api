import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import firebaseAdminAuth from "../../config/firebaseAuth";
import GlobalErrors from "../../globalErrors";
import sendEmail from "../confirmEmail/config";
import AccountModel, { Gender } from "../models/accountModel";

interface TokenInterface {
    uid: string;
    iat: number;
    exp: number;
}

const accountModel = new AccountModel();

class ManageAccounts {

    async signupWithEmail(req: Request, res: Response, next: NextFunction) {
        const firstName: string | undefined = req.body.firstName;
        const middleName: string | undefined = req.body.middleName;
        const lastName: string | undefined = req.body.lastName;
        const email: string | undefined = req.body.email;
        const phoneNumber: string | undefined = req.body.phoneNumber;
        const gender: Gender | undefined = req.body.gender;
        const password: string | undefined = req.body.password;

        if (!firstName || !lastName || !email || !password || !gender) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Incomplete arguments.");
            return next(nullArgumentError);
        }

        const userName = firstName + ' ' + lastName;
        
        try {
            const newAccount = await firebaseAdminAuth.createUser({
                email: email,
                emailVerified: false,
                phoneNumber: phoneNumber ? '+63'+ phoneNumber : null,
                password: password,
                displayName: userName,
                disabled: false,
            });
    
            const registerAccount = await accountModel.createAccount(firstName, lastName, email, newAccount.uid, gender, middleName, phoneNumber);
    
            const verificationToken = jwt.sign({ uid: newAccount.uid },
                process.env.SECRET_KEY as string, { algorithm: 'HS256', expiresIn: '24h' });
    
            const redirectUrl = process.env.BACKEND_HOST + "/users/verify/" + verificationToken;
            await sendEmail(email, 'Malabon Online Portal Email Verfication', userName, redirectUrl);

            return res.status(201).json({ account: registerAccount });

        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async signupWithSocial(req: Request, res: Response, next: NextFunction) {
        const uid: string | undefined = req.body.uid;
        const provider: string | undefined = req.body.provider;
        const firstName: string | undefined = req.body.firstName;
        const middleName: string | undefined = req.body.middleName;
        const lastName: string | undefined = req.body.lastName;
        const email: string | undefined = req.body.email;
        const phoneNumber: string | undefined = req.body.phoneNumber;
        const gender: Gender | undefined = req.body.gender;

        if (!firstName || !lastName || !email || !uid || !provider) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Incomplete arguments.");
            return next(nullArgumentError);
        }
        
        try {

            const account = await accountModel.findAccountByUid(uid);
            const emailAccount = await accountModel.findAccountByEmail(email);

            if (!account && !emailAccount) {
                const registerAccount = await accountModel.createAccount(firstName, lastName, email, uid, gender, middleName, phoneNumber, true, provider);
                return res.status(201).json({ account: registerAccount });
            }
            
            return res.status(200).json({ message: "Account is already saved." });

        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async confirmVerificationToken(req: Request, res: Response, next: NextFunction) {
        const token: string = req.params.token;

        const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
        const tokenData = decoded as TokenInterface;

        try {
            const account = await accountModel.findAccountByUid(tokenData.uid);

            if (!account) {
                const notFoundError = new GlobalErrors.NotFoundError("Account does not exist.");
                return next(notFoundError);
            }
    
            await firebaseAdminAuth.updateUser(tokenData.uid, { emailVerified: true });
            await firebaseAdminAuth.setCustomUserClaims(tokenData.uid, { role: 'citizen' });
    
            await accountModel.updateAccount(tokenData.uid, true);

            return res.status(200).redirect(process.env.FRONTEND_HOST + '/signin');
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async updateAccount(req: Request, res: Response, next: NextFunction) {
        const uid: string = req.params.uid;
        const firstName: string | undefined = req.body.firstName;
        const middleName: string | undefined = req.body.middleName;
        const lastName: string | undefined = req.body.lastName;
        const email: string | undefined = req.body.email;
        const phoneNumber: string | undefined = req.body.phoneNumber;
        const gender: Gender | undefined = req.body.gender;

        try {
            const updatedAccount = await accountModel.updateAccount(uid, undefined, firstName, lastName, middleName, gender, email, phoneNumber);

            return res.status(200).json({ account: updatedAccount });
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async getAccount(req: Request, res: Response, next: NextFunction) {
        const uid: string = req.user.uid;

        if (req.user.uid != uid && req.user.role == "citizen") {
            const unauthorizedError = new GlobalErrors.UnauthorizedError("Unauthorize to perform this action.");
            return next(unauthorizedError);
        }

        try {
            const account = await accountModel.findAccountByUid(uid);

            if (!account) {
                const notFoundError = new GlobalErrors.NotFoundError("Account does not exist.");
                return next(notFoundError);
            }

            return res.status(200).json({ account: account });
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async deleteAccount(req: Request, res: Response, next: NextFunction) {
        const uid = req.params.uid;

        if (req.user.uid != uid) {
            const unauthorizedError = new GlobalErrors.UnauthorizedError("Unauthorize to perform this action.");
            return next(unauthorizedError);
        }

        try {
            const deletedAccount = await accountModel.deleteAccount(uid);
            await firebaseAdminAuth.deleteUser(uid);

            return res.status(200).json({ account: deletedAccount });
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

}

export default ManageAccounts;