"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("../config/authentication"));
const manageAccounts_1 = __importDefault(require("./services/manageAccounts"));
const manageAdmin_1 = __importDefault(require("./services/manageAdmin"));
let accounts = express_1.default.Router();
const manageAccounts = new manageAccounts_1.default();
const manageAdmin = new manageAdmin_1.default();
accounts.post('/emailSignup', manageAccounts.signupWithEmail);
accounts.post('/socialSignup', manageAccounts.signupWithSocial);
accounts.get('/verify/:token', manageAccounts.confirmVerificationToken);
accounts.post('/update/:uid', manageAccounts.updateAccount);
accounts.get('/search', authentication_1.default, manageAccounts.getAccount);
accounts.delete('/delete/:uid', authentication_1.default, manageAccounts.deleteAccount);
accounts.get('/get/roles', authentication_1.default, manageAdmin.getUserRoles);
accounts.get('/admin/search', authentication_1.default, manageAdmin.getAdminAccount);
accounts.post('/admin/create', authentication_1.default, manageAdmin.createAdminAccount);
accounts.post('/admin/update', authentication_1.default, manageAdmin.updateAdminAccount);
accounts.get('/admin/remove/:uid', authentication_1.default, manageAdmin.removeAdminAccount);
accounts.get('/superuser/create/:uid', manageAdmin.createSuperuserAccount);
accounts.get('/superuser/remove/:uid', authentication_1.default, manageAdmin.removeSuperuserAccount);
accounts.get('/manage/:email', authentication_1.default, manageAdmin.manageAccounts);
exports.default = accounts;
//# sourceMappingURL=index.js.map