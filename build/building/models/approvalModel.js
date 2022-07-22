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
const prismaClient_1 = __importDefault(require("../../config/prismaClient"));
class BuildingApprovalModel {
    getFormsToApprove() {
        return __awaiter(this, void 0, void 0, function* () {
            const buildingApprove = yield prismaClient_1.default.buildingPermit.findMany({
                where: {
                    AND: {
                        approved: false,
                        topFile: null
                    }
                },
                include: {
                    approvals: true,
                    payments: true
                }
            });
            return buildingApprove;
        });
    }
    createApproval(accountId, building, approved, required, type, fee, remarks) {
        return __awaiter(this, void 0, void 0, function* () {
            const approval = yield prismaClient_1.default.buildingApproval.create({
                data: {
                    approvalType: type,
                    approvalFee: fee,
                    approved: approved,
                    required: required,
                    remarks: remarks,
                    officialId: accountId,
                    buildingId: building
                },
                include: {
                    building: true
                }
            });
            return approval;
        });
    }
    setTotalTax(buildingId, tax) {
        return __awaiter(this, void 0, void 0, function* () {
            const businessTax = yield prismaClient_1.default.buildingPayments.create({
                data: {
                    buildingId: buildingId,
                    amount: tax
                }
            });
            return businessTax;
        });
    }
    saveTaxOrderFile(buildingId, fileURL) {
        return __awaiter(this, void 0, void 0, function* () {
            if (fileURL) {
                const taxOrderFile = yield prismaClient_1.default.buildingFiles.create({
                    data: {
                        documentType: "Tax Order of Payment",
                        fileName: "Tax Order of Payment",
                        fileURL: fileURL,
                        buildingId: buildingId
                    },
                    include: {
                        building: true
                    }
                });
                return taxOrderFile;
            }
        });
    }
    setFireTrackingNumber(buildingId, trackingNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const trackNumber = yield prismaClient_1.default.buildingPermit.update({
                where: {
                    buildingId: buildingId,
                },
                data: {
                    trackNumber: trackingNumber
                }
            });
            return trackNumber;
        });
    }
}
exports.default = BuildingApprovalModel;
//# sourceMappingURL=approvalModel.js.map