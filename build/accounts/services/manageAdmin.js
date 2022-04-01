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
const approvalModel_1 = __importDefault(require("../../business/new/models/approvalModel"));
const firebaseAuth_1 = __importDefault(require("../../config/firebaseAuth"));
const globalErrors_1 = __importDefault(require("../../globalErrors"));
const accountModel_1 = __importDefault(require("../models/accountModel"));
const adminModel_1 = __importDefault(require("../models/adminModel"));
const adminModel = new adminModel_1.default();
const accountModel = new accountModel_1.default();
const approveModel = new approvalModel_1.default();
class ManageAdmin {
    createAdminAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const uid = req.body.uid;
            const roles = req.body.roles;
            if (!uid || !roles) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Incomplete arguments.");
                return next(nullArgumentError);
            }
            try {
                const account = yield accountModel.findAccountByUid(uid);
                if (!account) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("Account does not exist.");
                    return next(notFoundError);
                }
                if (account.officer)
                    return res.status(400).json({ message: "Account is already an admin." });
                const adminAccount = yield adminModel.createAdmin(uid, roles);
                yield firebaseAuth_1.default.setCustomUserClaims(uid, { role: "admin" });
                return res.status(201).json({ adminAccount: adminAccount });
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    updateAdminAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const uid = req.body.uid;
            const roles = req.body.roles;
            if (!uid || !roles) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Incomplete arguments.");
                return next(nullArgumentError);
            }
            try {
                const account = yield accountModel.findAccountByUid(uid);
                if (!account) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("Account does not exist.");
                    return next(notFoundError);
                }
                if (!account.officer)
                    return res.status(400).json({ message: "Account is not an admin." });
                const adminAccount = yield adminModel.updateAdminRoles(uid, roles);
                return res.status(201).json({ adminAccount: adminAccount });
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    createSuperuserAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            try {
                const account = yield accountModel.findAccountByUid(uid);
                if (!account) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("Account does not exist.");
                    return next(notFoundError);
                }
                if (account.superuser)
                    return res.status(400).json({ message: "Account is already a superuser." });
                const adminAccount = yield adminModel.createSuperuser(uid);
                yield firebaseAuth_1.default.setCustomUserClaims(uid, { role: "super" });
                return res.status(201).json({ adminAccount: adminAccount });
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    getAdminAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const uid = req.user.uid;
            try {
                const adminAccount = yield adminModel.getAdminAccount(uid);
                if (!adminAccount) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("Account does not exist.");
                    return next(notFoundError);
                }
                if (!adminAccount.officer)
                    return res.status(400).json({ message: "Account is not an admin." });
                const departments = ["OLBO", "CHO", "CENRO", "OCMA", "BFP", "PZO", "TRSY", "BPLO", "FENCING", "ARCHITECTURAL", "STRUCTURAL", "ELECTRICAL", "MECHANICAL", "SANITARY", "PLUMBING", "INTERIOR", "ELECTRONICS"];
                const adminRoles = adminAccount.superuser ? departments : adminAccount.roles.map(role => role.role);
                return res.status(201).json({ adminAccount: adminAccount, roles: adminRoles });
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    getUserRoles(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const uid = req.user.uid;
            try {
                const adminAccount = yield adminModel.getAdminAccount(uid);
                if (!adminAccount || !adminAccount.officer) {
                    return res.status(201).json({ roles: ['citizen'] });
                }
                const departments = ["OLBO", "CHO", "CENRO", "OCMA", "BFP", "PZO", "TRSY", "BPLO"];
                const adminRoles = adminAccount.superuser ? departments : adminAccount.roles.map(role => role.role);
                return res.status(201).json({ roles: adminRoles });
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    removeAdminAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            try {
                const account = yield accountModel.findAccountByUid(uid);
                if (!account) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("Account does not exist.");
                    return next(notFoundError);
                }
                if (!account.officer)
                    return res.status(400).json({ message: "Account is not an admin." });
                const adminAccount = yield adminModel.removeAdmin(uid);
                yield firebaseAuth_1.default.setCustomUserClaims(uid, { role: 'citizen' });
                return res.status(201).json({ adminAccount: adminAccount });
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    removeSuperuserAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            try {
                const account = yield accountModel.findAccountByUid(uid);
                if (!account) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("Account does not exist.");
                    return next(notFoundError);
                }
                if (!account.superuser)
                    return res.status(400).json({ message: "Account is not a superuser." });
                const adminAccount = yield adminModel.removeSuperuser(uid);
                yield firebaseAuth_1.default.setCustomUserClaims(uid, { role: 'admin' });
                return res.status(201).json({ adminAccount: adminAccount });
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    manageAccounts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.params.email;
            try {
                const adminAccount = yield adminModel.getAdminAccountByEmail(email);
                if (!adminAccount) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("Account does not exist.");
                    return next(notFoundError);
                }
                const departments = ["OLBO", "CHO", "CENRO", "OCMA", "BFP", "PZO", "TRSY", "BPLO", "FENCING", "ARCHITECTURAL", "STRUCTURAL", "ELECTRICAL", "MECHANICAL", "SANITARY", "PLUMBING", "INTERIOR", "ELECTRONICS"];
                const adminRoles = adminAccount.superuser ? departments : adminAccount.roles.map(role => role.role);
                const assessedForms = yield adminModel.getAdminApprovals(adminAccount.userId);
                const forApproval = yield approveModel.getWeeklyRequest(adminRoles);
                const firebaseUser = yield firebaseAuth_1.default.getUser(adminAccount.uid);
                return res.status(201).json({ adminAccount: adminAccount, roles: adminRoles, assessed: assessedForms.length, forAssess: forApproval.length, image: firebaseUser.photoURL });
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    manageAllAdminAccounts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminAccount = yield adminModel.getAllAdminAccount();
                let admins = [];
                for (let x = 0; x < adminAccount.length; x++) {
                    const currentAccount = adminAccount[x];
                    const departments = ["OLBO", "CHO", "CENRO", "OCMA", "BFP", "PZO", "TRSY", "BPLO", "FENCING", "ARCHITECTURAL", "STRUCTURAL", "ELECTRICAL", "MECHANICAL", "SANITARY", "PLUMBING", "INTERIOR", "ELECTRONICS"];
                    const adminRoles = currentAccount.superuser ? departments : currentAccount.roles.map(role => role.role);
                    const assessedForms = yield adminModel.getAdminApprovals(currentAccount.userId);
                    const firebaseUser = yield firebaseAuth_1.default.getUser(currentAccount.uid);
                    admins.push({
                        adminAccount: currentAccount, roles: adminRoles, assessed: assessedForms.length, image: firebaseUser.photoURL
                    });
                }
                return res.status(201).json(admins);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
}
exports.default = ManageAdmin;
//# sourceMappingURL=manageAdmin.js.map