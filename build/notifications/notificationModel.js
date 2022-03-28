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
                    AND: {
                        userId: accountId,
                        read: false
                    }
                }
            });
            return userNotifications;
        });
    }
    getWeekRequests(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBusiness = yield prismaClient_1.default.businessRegistry.findMany({
                orderBy: {
                    submittedAt: 'desc'
                },
                select: {
                    businessId: true,
                    businessName: true,
                    submittedAt: true,
                    TIN: true,
                    owners: true,
                    approvals: true,
                    addresses: true,
                    approved: true,
                    trackNumber: true,
                    payments: true
                }
            });
            const renewBusiness = yield prismaClient_1.default.businessRenewal.findMany({
                orderBy: {
                    renewAt: 'desc'
                },
                include: {
                    business: true,
                    payments: true
                }
            });
            const buildingPermit = yield prismaClient_1.default.buildingPermit.findMany({
                orderBy: {
                    submittedAt: 'desc'
                },
                include: {
                    approvals: true,
                    payments: true
                }
            });
            const realEstate = yield prismaClient_1.default.realEstate.findMany({
                orderBy: {
                    submittedAt: 'desc'
                },
                include: {
                    payments: true
                }
            });
            return {
                business: newBusiness,
                renew: renewBusiness,
                building: buildingPermit,
                realEstate: realEstate,
                productivity: yield this.getProductivity(accountId)
            };
        });
    }
    getProductivity(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            let curr = new Date;
            let first = curr.getDate() - curr.getDay();
            let last = first + 6;
            const firstday = new Date(curr.setDate(first));
            const lastday = new Date(curr.setDate(last));
            const businessApprovals = yield prismaClient_1.default.businessApproval.aggregate({
                where: {
                    AND: {
                        officialId: accountId,
                        approvedAt: {
                            lte: lastday,
                            gte: firstday
                        }
                    }
                },
                _count: {
                    approvalId: true
                }
            });
            const buildingApproval = yield prismaClient_1.default.buildingApproval.aggregate({
                where: {
                    AND: {
                        officialId: accountId,
                        approvedAt: {
                            lte: lastday,
                            gte: firstday
                        }
                    }
                },
                _count: {
                    approvalId: true
                }
            });
            return buildingApproval._count.approvalId + businessApprovals._count.approvalId;
        });
    }
}
exports.default = NotificationModel;
//# sourceMappingURL=notificationModel.js.map