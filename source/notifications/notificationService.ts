import { NextFunction, Request, Response } from "express";
import AccountModel from "../accounts/models/accountModel";
import GlobalErrors from "../globalErrors";
import NotificationModel from "./notificationModel";

const accountModel = new AccountModel();
const notifModel = new NotificationModel();

class NotificationService {
    async getUserNotifications(req: Request, res: Response, next: NextFunction) {
        const userUID: string = req.user.uid;

        try {
            const account = await accountModel.findAccountByUid(userUID);

            if (!account) {
                const notFoundError = new GlobalErrors.NotFoundError("Account not found.");
                return next(notFoundError);
            }
            
            const notifications = await notifModel.getUserNotifications(account.userId);
            return res.status(200).json(notifications);
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async setNotificationAsRead(req: Request, res: Response, next: NextFunction) {
        const notifId = parseInt(req.params.id);

        if (isNaN(notifId)) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Invalid parameters.");
            return next(nullArgumentError);
        }

        try {
            const notification = await notifModel.setReadNotification(notifId);
            return res.status(200).json(notification);
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }
}

export default NotificationService;