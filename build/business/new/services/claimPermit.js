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
const globalErrors_1 = __importDefault(require("../../../globalErrors"));
const claimModel_1 = __importDefault(require("../models/claimModel"));
const claimModel = new claimModel_1.default();
class ClaimPermit {
    setClaimSchedule(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const businessId = req.body.businessId;
            const schedule = req.body.schedule;
            const certificateId = req.body.certificateId;
            if (!businessId || !schedule || !certificateId) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Business ID and valid Payment ID is required.");
                return next(nullArgumentError);
            }
            try {
                const claimSchedule = yield claimModel.setAppointment(businessId, new Date(schedule));
                yield claimModel.approvedBusiness(businessId, certificateId);
                return res.status(201).json(claimSchedule);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    setFinishedAppointment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointmentId = parseInt(req.params.paymentId);
            if (isNaN(appointmentId)) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Invalid Payment ID.");
                return next(nullArgumentError);
            }
            try {
                const finishedAppointment = yield claimModel.setAppointmentFinished(appointmentId);
                return res.status(200).json(finishedAppointment);
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
exports.default = ClaimPermit;
//# sourceMappingURL=claimPermit.js.map