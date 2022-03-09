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
const prismaClient_1 = __importDefault(require("../../../config/prismaClient"));
class ClaimModel {
    setAppointment(businessId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const claimAppointment = yield prismaClient_1.default.businessAppointment.create({
                data: {
                    businessId: businessId,
                    schedule: date
                }
            });
            return claimAppointment;
        });
    }
    setAppointmentFinished(appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const finishAppointment = yield prismaClient_1.default.businessAppointment.update({
                where: {
                    appointmentId: appointmentId
                },
                data: {
                    claimed: true
                }
            });
            return finishAppointment;
        });
    }
    approvedBusiness(businessId, certificateId, certificateFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const approvedBusiness = yield prismaClient_1.default.businessRegistry.update({
                where: {
                    businessId: businessId
                },
                data: {
                    approved: true,
                    certificateId: certificateId,
                    certificateFile: certificateFile
                }
            });
            return approvedBusiness;
        });
    }
    getFormsForClaim() {
        return __awaiter(this, void 0, void 0, function* () {
            const forms = yield prismaClient_1.default.businessRegistry.findMany({
                where: {
                    approved: true
                },
                include: {
                    approvals: true,
                    addresses: true,
                    payments: true
                }
            });
            const filteredForms = forms.filter(form => form.certificateId == null);
            return filteredForms;
        });
    }
}
exports.default = ClaimModel;
//# sourceMappingURL=claimModel.js.map