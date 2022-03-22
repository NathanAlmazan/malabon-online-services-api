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
const accountModel_1 = __importDefault(require("../../../accounts/models/accountModel"));
const registerModel_1 = __importDefault(require("../../new/models/registerModel"));
const globalErrors_1 = __importDefault(require("../../../globalErrors"));
const businessModel_1 = __importDefault(require("../models/businessModel"));
const adminModel_1 = __importDefault(require("../../../accounts/models/adminModel"));
const notificationModel_1 = __importDefault(require("../../../notifications/notificationModel"));
const businessModel = new businessModel_1.default();
const accountModel = new accountModel_1.default();
const registerModel = new registerModel_1.default();
const adminModel = new adminModel_1.default();
const notifService = new notificationModel_1.default();
const superUserRoles = ["OLBO", "CHO", "CENRO", "OCMA", "BFP", "TRSY", "PZO"];
class RenewBusiness {
    getAvailableBusiness(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const uid = req.user.uid;
            try {
                const account = yield accountModel.findAccountByUid(uid);
                if (!account) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("User not found.");
                    return next(notFoundError);
                }
                const businesses = yield businessModel.getBusinesses(uid);
                return res.status(200).json(businesses);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    getRenewBusinessRequest(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const renewId = parseInt(req.params.renewId);
            const userUID = req.user.uid;
            const userRole = req.user.role;
            if (isNaN(renewId)) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Invalid parameters.");
                return next(nullArgumentError);
            }
            try {
                const form = yield businessModel.getRenewBusinessRequest(renewId);
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
    renewBusinessById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const businessId = parseInt(req.body.businessId);
            const receiptNumber = req.body.receiptNumber;
            const receiptFile = req.body.receiptFile;
            const quarterPayment = req.body.quarterPayment;
            const uid = req.user.uid;
            if (isNaN(businessId) || !receiptNumber || !receiptFile || quarterPayment == undefined) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Invalid parameters.");
                return next(nullArgumentError);
            }
            try {
                const account = yield accountModel.findAccountByUid(uid);
                const business = yield registerModel.getRegistrationForm(businessId);
                if (!business) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("Business not found.");
                    return next(notFoundError);
                }
                if (!account) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("Account not found.");
                    return next(notFoundError);
                }
                const renewBusiness = yield businessModel.requestRenewalById(account.userId, business.businessId, receiptNumber, receiptFile, quarterPayment);
                return res.status(200).json(renewBusiness);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    renewBusinessByCredentials(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const permitNumber = req.body.permitNumber;
            const receiptNumber = req.body.receiptNumber;
            const receiptFile = req.body.receiptFile;
            const businessName = req.body.businessName;
            const quarterPayment = req.body.quarterPayment;
            const uid = req.user.uid;
            if (!permitNumber || !receiptNumber || !receiptFile || quarterPayment == undefined) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Incomplete parameters.");
                return next(nullArgumentError);
            }
            try {
                const account = yield accountModel.findAccountByUid(uid);
                if (!account) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("Account not found.");
                    return next(notFoundError);
                }
                const renewBusiness = yield businessModel.requestRenewalByCredentials(account.userId, permitNumber, receiptNumber, receiptFile, quarterPayment, businessName);
                return res.status(200).json(renewBusiness);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    getBusinessTorenew(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const businessRenew = yield businessModel.getRenewalToApprove();
                return res.status(200).json(businessRenew);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    setTaxOrderOfPayment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const uid = req.user.uid;
            const businessId = req.body.businessId;
            const tax = req.body.tax;
            const fileURL = req.body.fileURL;
            if (!businessId || !tax) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Missing approval arguments.");
                return next(nullArgumentError);
            }
            if (typeof businessId != "number" || typeof tax != "number") {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Business ID and Tax should be numbers.");
                return next(nullArgumentError);
            }
            const adminRoles = yield adminModel.getAdminAccount(uid);
            if (!adminRoles) {
                const notFoundError = new globalErrors_1.default.NotFoundError("Account not found.");
                return next(notFoundError);
            }
            const roles = adminRoles.superuser ? superUserRoles : adminRoles.roles.map(role => role.role);
            if (!roles.includes("TRSY")) {
                const unauthorizedError = new globalErrors_1.default.UnauthorizedError("Unauthorized to approve this form.");
                return next(unauthorizedError);
            }
            try {
                yield businessModel.setTotalTax(businessId, tax);
                const taxOrderOfPayment = yield businessModel.setTOPFile(businessId, fileURL);
                if (!taxOrderOfPayment.business) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("Business not found.");
                    return next(notFoundError);
                }
                yield notifService.createNotification("Business Renewal", `Treasury posted Tax Order of Payment for your business, ${taxOrderOfPayment.business.businessName}.`, taxOrderOfPayment.business.userId);
                return res.status(200).json({ taxOrderOfPayment: taxOrderOfPayment });
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    getUserRequest(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const uid = req.user.uid;
            try {
                const account = yield accountModel.findAccountByUid(uid);
                if (!account) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("User not found.");
                    return next(notFoundError);
                }
                const businesses = yield businessModel.getRenewalRequest(account.userId);
                return res.status(200).json(businesses);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    getFormsToClaim(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const forms = yield businessModel.getFormsToClaim();
                return res.status(200).json(forms);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    setClaim(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const renewalId = req.body.renewalId;
            const appointment = req.body.appointment;
            const certificateFile = req.body.certificateFile;
            if (!renewalId || !appointment || !certificateFile) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Missing claim arguments.");
                return next(nullArgumentError);
            }
            try {
                const claimed = yield businessModel.setClaimRenewal(renewalId, appointment, certificateFile);
                yield notifService.createNotification("Business Renewal", `Your new business permit for ${claimed.businessName} is ready to claim.`, claimed.accountId);
                return res.status(200).json(claimed);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
}
exports.default = RenewBusiness;
//# sourceMappingURL=renewBusiness.js.map