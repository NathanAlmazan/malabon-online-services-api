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
const prismaClient_1 = __importDefault(require("../config/prismaClient"));
class NotificationModel {
    createNotification(subject, description, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newNotification = yield prismaClient_1.default.notifications.create({
                data: {
                    notifSubject: subject,
                    notifDesc: description,
                    userId: accountId
                }
            });
            return newNotification;
        });
    }
    setReadNotification(notifId) {
        return __awaiter(this, void 0, void 0, function* () {
            const readNotification = yield prismaClient_1.default.notifications.update({
                where: {
                    notifId: notifId
                },
                data: {
                    read: true
                }
            });
            return readNotification;
        });
    }
    getUserNotifications(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userNotifications = yield prismaClient_1.default.notifications.findMany({
                where: {
                    userId: accountId
                }
            });
            return userNotifications;
        });
    }
}
exports.default = NotificationModel;
//# sourceMappingURL=notificationModel.js.map