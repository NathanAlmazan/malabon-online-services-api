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
const adminModel_1 = __importDefault(require("../../../accounts/models/adminModel"));
const globalErrors_1 = __importDefault(require("../../../globalErrors"));
const notificationModel_1 = __importDefault(require("../../../notifications/notificationModel"));
const approvalModel_1 = __importDefault(require("../models/approvalModel"));
const approvalModel = new approvalModel_1.default();
const adminModel = new adminModel_1.default();
const notifService = new notificationModel_1.default();
const superUserRoles = ["OLBO", "CHO", "CENRO", "OCMA", "BFP", "TRSY", "PZO"];
class Approve {
    getFormsToApprove(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const uid = req.user.uid;
            try {
                const adminRoles = yield adminModel.getAdminAccount(uid);
                if (!adminRoles) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("Account not found.");
                    return next(notFoundError);
                }
                if (!adminRoles.officer)
                    return res.status(400).json({ message: "Account is not an admin." });
                const roles = adminRoles.superuser ? superUserRoles : adminRoles.roles.map(role => role.role);
                const formsToApprove = yield approvalModel.getRegFormsToApprove(roles);
                return res.status(200).json(formsToApprove);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    addApproval(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const uid = req.user.uid;
            const businessId = req.body.businessId;
            const approved = req.body.approved;
            const required = req.body.required;
            const type = req.body.type;
            const remarks = req.body.remarks;
            const fee = req.body.fee;
            if (!businessId || approved == undefined || required == undefined || !type || fee == undefined) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Missing approval arguments.");
                return next(nullArgumentError);
            }
            if (typeof businessId != "number" || typeof fee != "number") {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Business ID and Fee should be numbers.");
                return next(nullArgumentError);
            }
            if (typeof required != "boolean" || typeof approved != "boolean") {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Required and Approved arguments must be boolean.");
                return next(nullArgumentError);
            }
            const adminRoles = yield adminModel.getAdminAccount(uid);
            if (!adminRoles) {
                const notFoundError = new globalErrors_1.default.NotFoundError("Account not found.");
                return next(notFoundError);
            }
            const roles = adminRoles.superuser ? superUserRoles : adminRoles.roles.map(role => role.role);
            if (!roles.includes(type)) {
                const unauthorizedError = new globalErrors_1.default.UnauthorizedError("Unauthorized to approve this form.");
                return next(unauthorizedError);
            }
            try {
                const approval = yield approvalModel.createApproval(adminRoles.userId, businessId, approved, required, type, fee, remarks);
                yield notifService.createNotification("New Business Approval", `${type} department approved your new business, ${approval.business.businessName}.`, approval.business.userId);
                return res.status(201).json({ approval: approval });
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
                yield approvalModel.setTotalTax(businessId, tax);
                const taxOrderOfPayment = yield approvalModel.saveTaxOrderFile(businessId, fileURL);
                if (!taxOrderOfPayment) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("Request not found.");
                    return next(notFoundError);
                }
                yield notifService.createNotification("New Business Approval", `Treasury posted Tax Order of Payment for your new business, ${taxOrderOfPayment.business.businessName}.`, taxOrderOfPayment.business.userId);
                return res.status(200).json({ taxOrderOfPayment: taxOrderOfPayment });
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    getTreasuryForms(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const uid = req.user.uid;
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
                const taxOrderForms = approvalModel.getFormsForTax();
                return res.status(200).json({ taxOrderForms: taxOrderForms });
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    getApprovedForms(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const uid = req.user.uid;
            const adminRoles = yield adminModel.getAdminAccount(uid);
            if (!adminRoles) {
                const notFoundError = new globalErrors_1.default.NotFoundError("Account not found.");
                return next(notFoundError);
            }
            const roles = adminRoles.superuser ? superUserRoles : adminRoles.roles.map(role => role.role);
            if (!roles.includes("BPLO")) {
                const unauthorizedError = new globalErrors_1.default.UnauthorizedError("Unauthorized to get this forms.");
                return next(unauthorizedError);
            }
            try {
                const approvedForms = approvalModel.getApprovedForms();
                return res.status(200).json({ approvedForms: approvedForms });
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    setFireTrackingNumber(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const businessId = parseInt(req.params.businessId);
            const trackingNumber = parseInt(req.body.trackingNumber);
            if (isNaN(trackingNumber) || isNaN(businessId)) {
                const forbiddenError = new globalErrors_1.default.ForbiddenError("The tracking number or business ID you set is forbidden.");
                return next(forbiddenError);
            }
            try {
                const trackNum = yield approvalModel.setFireTrackingNumber(businessId, trackingNumber);
                return res.status(200).json(trackNum);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    getOfficialProgress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const uid = req.user.uid;
            try {
                const adminRoles = yield adminModel.getAdminAccount(uid);
                if (!adminRoles) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("Account not found.");
                    return next(notFoundError);
                }
                const progress = yield approvalModel.getProgress(adminRoles.userId);
                return res.status(200).json(progress);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
}
exports.default = Approve;
//# sourceMappingURL=approve.js.map