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
exports.superUserRoles = void 0;
const adminModel_1 = __importDefault(require("../../accounts/models/adminModel"));
const globalErrors_1 = __importDefault(require("../../globalErrors"));
const notificationModel_1 = __importDefault(require("../../notifications/notificationModel"));
const approvalModel_1 = __importDefault(require("../models/approvalModel"));
const claimModel_1 = __importDefault(require("../models/claimModel"));
const approveModel = new approvalModel_1.default();
const adminModel = new adminModel_1.default();
const claimModel = new claimModel_1.default();
const notifService = new notificationModel_1.default();
exports.superUserRoles = ["FENCING", "ARCHITECTURAL", "STRUCTURAL", "ELECTRICAL", "MECHANICAL", "BFP", "SANITARY", "PLUMBING", "INTERIOR", "ELECTRONICS", "TRSY"];
class BuildingApproveService {
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
                if (adminRoles.superuser || adminRoles.roles.map(role => role.role).includes("BUILDING OFFICIAL")) {
                    const forms = yield approveModel.getFormsToApprove();
                    return res.status(200).json(forms);
                }
                const unauthorizedError = new globalErrors_1.default.UnauthorizedError("Unauthorized request.");
                return next(unauthorizedError);
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
            const buildingId = req.body.buildingId;
            const approved = req.body.approved;
            const required = req.body.required;
            const type = req.body.type;
            const remarks = req.body.remarks;
            const fee = req.body.fee;
            if (!buildingId || approved == undefined || required == undefined || !type || fee == undefined) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Missing approval arguments.");
                return next(nullArgumentError);
            }
            if (typeof buildingId != "number" || typeof fee != "number") {
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
            const roles = adminRoles.superuser ? exports.superUserRoles : adminRoles.roles.map(role => role.role);
            if (!roles.includes(type)) {
                const unauthorizedError = new globalErrors_1.default.UnauthorizedError("Unauthorized to approve this form.");
                return next(unauthorizedError);
            }
            try {
                const approval = yield approveModel.createApproval(adminRoles.userId, buildingId, approved, required, type, fee, remarks);
                yield notifService.createNotification("Building Permit", `${type} department approved your building plam`, approval.building.userId);
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
            const buildingId = req.body.buildingId;
            const tax = req.body.tax;
            const fileURL = req.body.fileURL;
            if (!buildingId || !tax) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Missing approval arguments.");
                return next(nullArgumentError);
            }
            if (typeof buildingId != "number" || typeof tax != "number") {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Business ID and Tax should be numbers.");
                return next(nullArgumentError);
            }
            const adminRoles = yield adminModel.getAdminAccount(uid);
            if (!adminRoles) {
                const notFoundError = new globalErrors_1.default.NotFoundError("Account not found.");
                return next(notFoundError);
            }
            const roles = adminRoles.superuser ? exports.superUserRoles : adminRoles.roles.map(role => role.role);
            if (!roles.includes("TRSY")) {
                const unauthorizedError = new globalErrors_1.default.UnauthorizedError("Unauthorized to approve this form.");
                return next(unauthorizedError);
            }
            try {
                yield approveModel.setTotalTax(buildingId, tax);
                const taxOrderOfPayment = yield approveModel.saveTaxOrderFile(buildingId, fileURL);
                if (!taxOrderOfPayment) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("Building not found.");
                    return next(notFoundError);
                }
                yield notifService.createNotification("Building Permit", `Your Tax Order of Payment is posted.`, taxOrderOfPayment.building.userId);
                return res.status(200).json({ taxOrderOfPayment: taxOrderOfPayment });
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    setFireTrackingNumber(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const buildingId = parseInt(req.params.buildingId);
            const trackingNumber = parseInt(req.body.trackingNumber);
            if (isNaN(trackingNumber) || isNaN(buildingId)) {
                const forbiddenError = new globalErrors_1.default.ForbiddenError("The tracking number or business ID you set is forbidden.");
                return next(forbiddenError);
            }
            try {
                const trackNum = yield approveModel.setFireTrackingNumber(buildingId, trackingNumber);
                return res.status(200).json(trackNum);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    setClaimSchedule(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const buildingId = req.body.buildingId;
            const schedule = req.body.schedule;
            const certificateFile = req.body.certificateFile;
            if (!buildingId || !schedule) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Building ID and valid Payment ID is required.");
                return next(nullArgumentError);
            }
            try {
                const claimSchedule = yield claimModel.setAppointment(buildingId, new Date(schedule));
                yield claimModel.approvedBusiness(buildingId, certificateFile);
                yield notifService.createNotification("Building Permit", `Your building permit is ready to claim.`, claimSchedule.userId);
                return res.status(201).json(claimSchedule);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    getFormsForClaim(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const forms = yield claimModel.getFormsForClaim();
                return res.status(200).json(forms);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
}
exports.default = BuildingApproveService;
//# sourceMappingURL=approve.js.map