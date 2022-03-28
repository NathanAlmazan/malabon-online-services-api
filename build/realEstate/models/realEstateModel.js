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
class RealEstateModel {
    registerRealEstate(userId, ownerName, taxNumber, receiptFile, paymentType) {
        return __awaiter(this, void 0, void 0, function* () {
            const realEstate = yield prismaClient_1.default.realEstate.create({
                data: {
                    accountId: userId,
                    ownerName: ownerName,
                    declarationNum: taxNumber,
                    receiptFile: receiptFile,
                    quarterly: paymentType
                }
            });
            return realEstate;
        });
    }
    getRealEstate(estateId) {
        return __awaiter(this, void 0, void 0, function* () {
            const realEstate = yield prismaClient_1.default.realEstate.findUnique({
                where: {
                    estateId: estateId,
                },
                include: {
                    payments: true,
                    userAccount: true
                }
            });
            return realEstate;
        });
    }
    requestRenewalByCredentials(userId, permitId, receipt, receiptFile, paymentType, businessName) {
        return __awaiter(this, void 0, void 0, function* () {
            const businessRenewal = yield prismaClient_1.default.businessRenewal.create({
                data: {
                    permitNumber: permitId,
                    receiptNumber: receipt,
                    receiptFile: receiptFile,
                    businessName: businessName,
                    quarterly: paymentType,
                    accountId: userId
                }
            });
            return businessRenewal;
        });
    }
    getEstateToApprove() {
        return __awaiter(this, void 0, void 0, function* () {
            const realEstate = yield prismaClient_1.default.realEstate.findMany({
                where: {
                    AND: {
                        completed: false,
                        topFile: null
                    }
                },
                include: {
                    payments: true
                }
            });
            return realEstate;
        });
    }
    setTotalTax(estateId, tax) {
        return __awaiter(this, void 0, void 0, function* () {
            const estateTax = yield prismaClient_1.default.realEstatePayments.create({
                data: {
                    estateId: estateId,
                    amount: tax
                }
            });
            return estateTax;
        });
    }
    setTOPFile(estateId, fileURL) {
        return __awaiter(this, void 0, void 0, function* () {
            const topFile = yield prismaClient_1.default.realEstate.update({
                where: {
                    estateId: estateId
                },
                data: {
                    topFile: fileURL
                },
                include: {
                    payments: true
                }
            });
            return topFile;
        });
    }
    getRealEstateRequests(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const realEstate = yield prismaClient_1.default.realEstate.findMany({
                where: {
                    accountId: userId
                },
                include: {
                    payments: true
                }
            });
            return realEstate;
        });
    }
    setClaimRenewal(estateId, appointment, certificateFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const claimed = yield prismaClient_1.default.realEstate.update({
                where: {
                    estateId: estateId
                },
                data: {
                    appointment: new Date(appointment),
                    certificateFile: certificateFile
                }
            });
            return claimed;
        });
    }
    getFormsToClaim() {
        return __awaiter(this, void 0, void 0, function* () {
            const forms = yield prismaClient_1.default.realEstate.findMany({
                where: {
                    AND: {
                        completed: true,
                        certificateFile: null
                    }
                },
                include: {
                    payments: true
                }
            });
            return forms;
        });
    }
}
exports.default = RealEstateModel;
//# sourceMappingURL=realEstateModel.js.map