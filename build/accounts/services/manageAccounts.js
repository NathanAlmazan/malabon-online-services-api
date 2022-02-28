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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const firebaseAuth_1 = __importDefault(require("../../config/firebaseAuth"));
const globalErrors_1 = __importDefault(require("../../globalErrors"));
const config_1 = __importDefault(require("../confirmEmail/config"));
const accountModel_1 = __importDefault(require("../models/accountModel"));
const accountModel = new accountModel_1.default();
class ManageAccounts {
    signupWithEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const firstName = req.body.firstName;
            const middleName = req.body.middleName;
            const lastName = req.body.lastName;
            const email = req.body.email;
            const phoneNumber = req.body.phoneNumber;
            const gender = req.body.gender;
            const password = req.body.password;
            if (!firstName || !lastName || !email || !password || !gender) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Incomplete arguments.");
                return next(nullArgumentError);
            }
            const userName = firstName + ' ' + lastName;
            try {
                const newAccount = yield firebaseAuth_1.default.createUser({
                    email: email,
                    emailVerified: false,
                    phoneNumber: phoneNumber ? '+63' + phoneNumber : null,
                    password: password,
                    displayName: userName,
                    disabled: false,
                });
                const registerAccount = yield accountModel.createAccount(firstName, lastName, email, newAccount.uid, gender, middleName, phoneNumber);
                const verificationToken = jsonwebtoken_1.default.sign({ uid: newAccount.uid }, process.env.SECRET_KEY, { algorithm: 'HS256', expiresIn: '24h' });
                const redirectUrl = process.env.BACKEND_HOST + "/users/verify/" + verificationToken;
                yield (0, config_1.default)(email, 'Malabon Online Portal Email Verfication', userName, redirectUrl);
                return res.status(201).json({ account: registerAccount });
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    signupWithSocial(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const uid = req.body.uid;
            const provider = req.body.provider;
            const firstName = req.body.firstName;
            const middleName = req.body.middleName;
            const lastName = req.body.lastName;
            const email = req.body.email;
            const phoneNumber = req.body.phoneNumber;
            const gender = req.body.gender;
            if (!firstName || !lastName || !email || !uid || !provider) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Incomplete arguments.");
                return next(nullArgumentError);
            }
            try {
                const account = yield accountModel.findAccountByUid(uid);
                const emailAccount = yield accountModel.findAccountByEmail(email);
                if (!account && !emailAccount) {
                    const registerAccount = yield accountModel.createAccount(firstName, lastName, email, uid, gender, middleName, phoneNumber, true, provider);
                    return res.status(201).json({ account: registerAccount });
                }
                return res.status(200).json({ message: "Account is already saved." });
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    confirmVerificationToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.params.token;
            const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
            const tokenData = decoded;
            try {
                const account = yield accountModel.findAccountByUid(tokenData.uid);
                if (!account) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("Account does not exist.");
                    return next(notFoundError);
                }
                yield firebaseAuth_1.default.updateUser(tokenData.uid, { emailVerified: true });
                yield firebaseAuth_1.default.setCustomUserClaims(tokenData.uid, { role: 'citizen' });
                yield accountModel.updateAccount(tokenData.uid, true);
                return res.status(200).redirect(process.env.FRONTEND_HOST + '/signin');
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    updateAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            const firstName = req.body.firstName;
            const middleName = req.body.middleName;
            const lastName = req.body.lastName;
            const email = req.body.email;
            const phoneNumber = req.body.phoneNumber;
            const gender = req.body.gender;
            try {
                const updatedAccount = yield accountModel.updateAccount(uid, undefined, firstName, lastName, middleName, gender, email, phoneNumber);
                return res.status(200).json({ account: updatedAccount });
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    getAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const uid = req.user.uid;
            if (req.user.uid != uid && req.user.role == "citizen") {
                const unauthorizedError = new globalErrors_1.default.UnauthorizedError("Unauthorize to perform this action.");
                return next(unauthorizedError);
            }
            try {
                const account = yield accountModel.findAccountByUid(uid);
                if (!account) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("Account does not exist.");
                    return next(notFoundError);
                }
                return res.status(200).json({ account: account });
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    deleteAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            if (req.user.uid != uid) {
                const unauthorizedError = new globalErrors_1.default.UnauthorizedError("Unauthorize to perform this action.");
                return next(unauthorizedError);
            }
            try {
                const deletedAccount = yield accountModel.deleteAccount(uid);
                yield firebaseAuth_1.default.deleteUser(uid);
                return res.status(200).json({ account: deletedAccount });
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
}
exports.default = ManageAccounts;
//# sourceMappingURL=manageAccounts.js.map