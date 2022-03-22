"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accountModel_1 = __importDefault(require("../accounts/models/accountModel"));
const globalErrors_1 = __importDefault(require("../globalErrors"));
const notificationModel_1 = __importDefault(require("./notificationModel"));
const accountModel = new accountModel_1.default();
const notifModel = new notificationModel_1.default();
class NotificationService {
    getUserNotifications(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userUID = req.user.uid;
            try {
                const account = yield accountModel.findAccountByUid(userUID);
                if (!account) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("Account not found.");
                    return next(notFoundError);
                }
                const notifications = yield notifModel.getUserNotifications(account.userId);
                return res.status(200).json(notifications);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    setNotificationAsRead(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const notifId = parseInt(req.params.id);
            if (isNaN(notifId)) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Invalid parameters.");
                return next(nullArgumentError);
            }
            try {
                const notification = yield notifModel.setReadNotification(notifId);
                return res.status(200).json(notification);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
}
exports.default = NotificationService;
//# sourceMappingURL=notificationService.js.map