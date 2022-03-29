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
const prismaClient_1 = __importDefault(require("../../config/prismaClient"));
const departments = ["OLBO", "CHO", "CENRO", "OCMA", "BFP", "PZO", "TRSY", "BPLO", "FENCING", "ARCHITECTURAL", "STRUCTURAL", "ELECTRICAL", "MECHANICAL", "SANITARY", "PLUMBING", "INTERIOR", "ELECTRONICS"];
class AdminModel {
    checkDepartmentTypes(roles, userId) {
        let adminRoles = [];
        roles.forEach(role => {
            if (departments.includes(role)) {
                adminRoles.push({ accountId: userId, role: role });
            }
        });
        return adminRoles;
    }
    createAdmin(uid, roles) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminAccount = yield prismaClient_1.default.accounts.update({
                where: {
                    uid: uid,
                },
                data: {
                    officer: true
                }
            });
            const adminRoles = this.checkDepartmentTypes(roles, adminAccount.userId);
            yield prismaClient_1.default.roles.createMany({
                data: adminRoles
            });
            return { account: adminAccount, roles: roles };
        });
    }
    createSuperuser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const superuser = yield prismaClient_1.default.accounts.update({
                where: {
                    uid: uid,
                },
                data: {
                    superuser: true,
                    officer: true
                }
            });
            return superuser;
        });
    }
    updateAdminRoles(uid, roles) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminAccount = yield prismaClient_1.default.accounts.findUnique({
                where: {
                    uid: uid,
                },
                select: {
                    userId: true
                }
            });
            if (!adminAccount)
                return null;
            yield prismaClient_1.default.roles.deleteMany({
                where: {
                    accountId: adminAccount.userId
                }
            });
            const adminRoles = this.checkDepartmentTypes(roles, adminAccount.userId);
            yield prismaClient_1.default.roles.createMany({
                data: adminRoles
            });
            return { account: adminAccount, roles: roles };
        });
    }
    getAdminAccount(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminAccount = yield prismaClient_1.default.accounts.findUnique({
                where: {
                    uid: uid,
                },
                include: {
                    roles: true,
                }
            });
            return adminAccount;
        });
    }
    getAdminAccountByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminAccount = yield prismaClient_1.default.accounts.findUnique({
                where: {
                    email: email
                },
                include: {
                    roles: true,
                }
            });
            return adminAccount;
        });
    }
    getAllAdminAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            const adminAccount = yield prismaClient_1.default.accounts.findMany({
                where: {
                    officer: true
                },
                include: {
                    roles: true,
                }
            });
            return adminAccount;
        });
    }
    getAdminApprovals(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            let curr = new Date;
            let first = curr.getDate() - curr.getDay();
            let last = first + 6;
            const approvals = yield prismaClient_1.default.businessApproval.findMany({
                where: {
                    AND: {
                        officialId: accountId,
                        approvedAt: {
                            lte: new Date(curr.setDate(last))
                        }
                    }
                }
            });
            return approvals;
        });
    }
    removeSuperuser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const superuser = yield prismaClient_1.default.accounts.update({
                where: {
                    uid: uid,
                },
                data: {
                    superuser: false
                }
            });
            return superuser;
        });
    }
    removeAdmin(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminAccount = yield prismaClient_1.default.accounts.update({
                where: {
                    uid: uid,
                },
                data: {
                    officer: false
                }
            });
            yield prismaClient_1.default.roles.deleteMany({
                where: {
                    accountId: adminAccount.userId
                }
            });
            return adminAccount;
        });
    }
}
exports.default = AdminModel;
//# sourceMappingURL=adminModel.js.map