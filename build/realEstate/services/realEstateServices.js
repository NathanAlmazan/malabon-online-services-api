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
const accountModel_1 = __importDefault(require("../../accounts/models/accountModel"));
const adminModel_1 = __importDefault(require("../../accounts/models/adminModel"));
const globalErrors_1 = __importDefault(require("../../globalErrors"));
const notificationModel_1 = __importDefault(require("../../notifications/notificationModel"));
const realEstateModel_1 = __importDefault(require("../models/realEstateModel"));
const realEstateModel = new realEstateModel_1.default();
const accountModel = new accountModel_1.default();
const adminModel = new adminModel_1.default();
const notifService = new notificationModel_1.default();
const superUserRoles = ["OLBO", "CHO", "CENRO", "OCMA", "BFP", "TRSY", "PZO"];
class RealEstateServices {
    realEstateRegister(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const ownerName = req.body.ownerName;
            const taxNumber = req.body.taxNumber;
            const receiptFile = req.body.receiptFile;
            const quarterPayment = req.body.quarterPayment;
            const uid = req.user.uid;
            if (!ownerName || !taxNumber || !receiptFile || quarterPayment == undefined) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Invalid parameters.");
                return next(nullArgumentError);
            }
            try {
                const account = yield accountModel.findAccountByUid(uid);
                if (!account) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("Account not found.");
                    return next(notFoundError);
                }
                const realEstate = yield realEstateModel.registerRealEstate(account.userId, ownerName, taxNumber, receiptFile, quarterPayment);
                return res.status(200).json(realEstate);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    getRealEstate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const estateId = parseInt(req.params.estateId);
            const userUID = req.user.uid;
            const userRole = req.user.role;
            if (isNaN(estateId)) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Invalid parameters.");
                return next(nullArgumentError);
            }
            try {
                const form = yield realEstateModel.getRealEstate(estateId);
                if (!form) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("Request form not found.");
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
    getUserRequests(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const uid = req.user.uid;
            try {
                const account = yield accountModel.findAccountByUid(uid);
                if (!account) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("User not found.");
                    return next(notFoundError);
                }
                const businesses = yield realEstateModel.getRealEstateRequests(account.userId);
                return res.status(200).json(businesses);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    getRealEstateToApprove(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const realEstate = yield realEstateModel.getEstateToApprove();
                return res.status(200).json(realEstate);
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
            const estateId = req.body.estateId;
            const tax = req.body.tax;
            const fileURL = req.body.fileURL;
            if (!estateId || !tax) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Missing approval arguments.");
                return next(nullArgumentError);
            }
            if (typeof estateId != "number" || typeof tax != "number") {
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
                yield realEstateModel.setTotalTax(estateId, tax);
                const taxOrderOfPayment = yield realEstateModel.setTOPFile(estateId, fileURL);
                yield notifService.createNotification("Real Estate Tax", `Your real estate tax payment for ${new Date().getFullYear()} is approved. Please see details of tax payment.`, taxOrderOfPayment.accountId);
                return res.status(200).json(taxOrderOfPayment);
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
                const forms = yield realEstateModel.getFormsToClaim();
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
            const estateId = req.body.estateId;
            const appointment = req.body.appointment;
            const certificateFile = req.body.certificateFile;
            if (!estateId || !appointment || !certificateFile) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Missing claim arguments.");
                return next(nullArgumentError);
            }
            try {
                const claimed = yield realEstateModel.setClaimRenewal(estateId, appointment, certificateFile);
                yield notifService.createNotification("Real Estate Tax", `Your real estate tax payment for ${new Date().getFullYear()} was paid successfully. You can now download the official receipt.`, claimed.accountId);
                return res.status(200).json(claimed);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
}
exports.default = RealEstateServices;
//# sourceMappingURL=realEstateServices.js.map