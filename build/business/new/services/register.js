"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const accountModel_1 = __importDefault(require("../../../accounts/models/accountModel"));
const globalErrors_1 = __importDefault(require("../../../globalErrors"));
const registerModel_1 = __importStar(require("../models/registerModel"));
const registerModel = new registerModel_1.default();
const accountModel = new accountModel_1.default();
class Register {
    submitForm(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const formData = req.body;
            const userUID = req.user.uid;
            if (!formData) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Missing form data.");
                return next(nullArgumentError);
            }
            const formKeys = Object.keys(formData);
            for (let i = 0; i < registerModel_1.RegisterFormKeys.length; i++) {
                if (!formKeys.includes(registerModel_1.RegisterFormKeys[i])) {
                    const nullArgumentError = new globalErrors_1.default.NullArgumentError(registerModel_1.RegisterFormKeys[i] + " is missing in form data.");
                    return next(nullArgumentError);
                }
            }
            try {
                const account = yield accountModel.findAccountByUid(userUID);
                if (!account) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("Account not found.");
                    return next(notFoundError);
                }
                const submittedForm = yield registerModel.saveRegistrationForm(formData, account.userId);
                const savedForm = yield registerModel.getRegistrationForm(submittedForm);
                return res.status(201).json({ submittedForm: savedForm });
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    getSubmittedForm(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const businessId = parseInt(req.params.id);
            const userUID = req.user.uid;
            const userRole = req.user.role;
            if (isNaN(businessId)) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Invalid parameters.");
                return next(nullArgumentError);
            }
            try {
                const form = yield registerModel.getRegistrationForm(businessId);
                if (!form) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("Registration form not found.");
                    return next(notFoundError);
                }
                if (form.userAccount.uid != userUID && Boolean(userRole != "admin" && userRole != "super")) {
                    const unauthorizedError = new globalErrors_1.default.UnauthorizedError("You are not authorized to see this form.");
                    return next(unauthorizedError);
                }
                return res.status(200).json(form);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    getUserApplications(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userUID = req.user.uid;
            try {
                const account = yield accountModel.findAccountByUid(userUID);
                if (!account) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("Account not found.");
                    return next(notFoundError);
                }
                const userApplications = yield registerModel.getUserApplications(account.userId);
                return res.status(200).json(userApplications);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
}
exports.default = Register;
//# sourceMappingURL=register.js.map