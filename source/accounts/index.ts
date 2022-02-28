import express from "express";
import checkCredentials from "../config/authentication";
import ManageAccounts from "./services/manageAccounts";
import ManageAdmin from "./services/manageAdmin";

let accounts = express.Router();

const manageAccounts = new ManageAccounts();
const manageAdmin = new ManageAdmin();

accounts.post('/emailSignup', manageAccounts.signupWithEmail);
accounts.post('/socialSignup', manageAccounts.signupWithSocial);
accounts.get('/verify/:token', manageAccounts.confirmVerificationToken);
accounts.post('/update/:uid', manageAccounts.updateAccount);
accounts.get('/search', checkCredentials, manageAccounts.getAccount);
accounts.delete('/delete/:uid', checkCredentials, manageAccounts.deleteAccount);
accounts.get('/get/roles', checkCredentials, manageAdmin.getUserRoles);

accounts.get('/admin/search', checkCredentials, manageAdmin.getAdminAccount);
accounts.post('/admin/create', checkCredentials, manageAdmin.createAdminAccount);
accounts.post('/admin/update', checkCredentials, manageAdmin.updateAdminAccount);
accounts.get('/admin/remove/:uid', checkCredentials, manageAdmin.removeAdminAccount);
accounts.get('/superuser/create/:uid', checkCredentials, manageAdmin.createSuperuserAccount);
accounts.get('/superuser/remove/:uid', checkCredentials, manageAdmin.removeSuperuserAccount);
accounts.get('/manage/:email', checkCredentials, manageAdmin.manageAccounts);

export default accounts;

