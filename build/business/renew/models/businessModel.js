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
class BusinessRenewal {
    getBusinesses(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const businesses = yield prismaClient_1.default.businessRegistry.findMany({
                where: {
                    AND: {
                        userAccount: {
                            uid: uid,
                        },
                        approved: true,
                    }
                }
            });
            return businesses;
        });
    }
    requestRenewalById(userId, businessId, receiptNumber, receiptFile, paymentType) {
        return __awaiter(this, void 0, void 0, function* () {
            const businessRenewal = yield prismaClient_1.default.businessRenewal.create({
                data: {
                    businessId: businessId,
                    receiptNumber: receiptNumber,
                    receiptFile: receiptFile,
                    quarterly: paymentType,
                    accountId: userId
                }
            });
            return businessRenewal;
        });
    }
    getRenewBusinessRequest(renewalId) {
        return __awaiter(this, void 0, void 0, function* () {
            const renewBusiness = yield prismaClient_1.default.businessRenewal.findUnique({
                where: {
                    renewalId: renewalId
                },
                include: {
                    business: true,
                    payments: true,
                    userAccount: true
                }
            });
            return renewBusiness;
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
    getRenewalToApprove() {
        return __awaiter(this, void 0, void 0, function* () {
            const businessRenew = yield prismaClient_1.default.businessRenewal.findMany({
                where: {
                    completed: false
                },
                include: {
                    business: true,
                    payments: true
                }
            });
            return businessRenew.filter(business => business.topFile == null);
        });
    }
    setTotalTax(businessId, tax) {
        return __awaiter(this, void 0, void 0, function* () {
            const businessTax = yield prismaClient_1.default.businessPayments.create({
                data: {
                    renewalId: businessId,
                    newBusiness: false,
                    amount: tax
                }
            });
            return businessTax;
        });
    }
    setTOPFile(businessId, fileURL) {
        return __awaiter(this, void 0, void 0, function* () {
            const topFile = yield prismaClient_1.default.businessRenewal.update({
                where: {
                    renewalId: businessId
                },
                data: {
                    topFile: fileURL
                }
            });
            return topFile;
        });
    }
    getRenewalRequest(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const businessRenew = yield prismaClient_1.default.businessRenewal.findMany({
                where: {
                    AND: {
                        accountId: userId
                    }
                },
                include: {
                    business: true
                }
            });
            return businessRenew;
        });
    }
    setClaimRenewal(renewalId, appointment, certificateFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const claimed = yield prismaClient_1.default.businessRenewal.update({
                where: {
                    renewalId: renewalId
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
            const forms = yield prismaClient_1.default.businessRenewal.findMany({
                where: {
                    completed: true
                },
                include: {
                    business: true,
                    payments: true
                }
            });
            return forms.filter(form => form.certificateFile == null);
        });
    }
}
exports.default = BusinessRenewal;
//# sourceMappingURL=businessModel.js.map