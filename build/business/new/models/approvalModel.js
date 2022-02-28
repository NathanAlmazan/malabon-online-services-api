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
class ApprovalModel {
    getRegFormsToApprove(roles) {
        return __awaiter(this, void 0, void 0, function* () {
            const formsForApprovals = yield prismaClient_1.default.businessRegistry.findMany({
                where: {
                    approved: false
                },
                select: {
                    businessId: true,
                    businessName: true,
                    submittedAt: true,
                    TIN: true,
                    owners: true,
                    approvals: true,
                    addresses: true,
                    trackNumber: true,
                    payments: true
                },
                orderBy: {
                    submittedAt: 'desc'
                }
            });
            let formsToApprove = [];
            formsForApprovals.forEach(form => {
                const approvals = form.approvals.map(approval => approval.approvalType);
                let count = 0;
                roles.forEach(role => {
                    if (role == "TRSY") {
                        if (form.payments.length == 0)
                            count++;
                    }
                    else if (!approvals.includes(role))
                        count++;
                });
                if (count > 0) {
                    formsToApprove.push(form);
                }
            });
            return formsToApprove;
        });
    }
    getWeeklyRequest(roles) {
        return __awaiter(this, void 0, void 0, function* () {
            let curr = new Date;
            let first = curr.getDate() - curr.getDay();
            let last = first + 6;
            const formsForApprovals = yield prismaClient_1.default.businessRegistry.findMany({
                where: {
                    submittedAt: {
                        gte: new Date(curr.setDate(first)),
                        lte: new Date(curr.setDate(last))
                    }
                },
                select: {
                    businessId: true,
                    businessName: true,
                    submittedAt: true,
                    TIN: true,
                    owners: true,
                    approvals: true,
                    addresses: true,
                    trackNumber: true,
                    payments: true
                },
                orderBy: {
                    submittedAt: 'desc'
                }
            });
            let formsToApprove = [];
            formsForApprovals.forEach(form => {
                const approvals = form.approvals.map(approval => approval.approvalType);
                let count = 0;
                roles.forEach(role => {
                    if (role == "TRSY") {
                        if (form.payments.length == 0)
                            count++;
                    }
                    else if (!approvals.includes(role))
                        count++;
                });
                if (count > 0) {
                    formsToApprove.push(form);
                }
            });
            return formsToApprove;
        });
    }
    createApproval(accountId, businessId, approved, required, type, fee, remarks) {
        return __awaiter(this, void 0, void 0, function* () {
            const approval = yield prismaClient_1.default.businessApproval.create({
                data: {
                    approvalType: type,
                    approvalFee: fee,
                    approved: approved,
                    required: required,
                    remarks: remarks,
                    officialId: accountId,
                    businessId: businessId
                }
            });
            return approval;
        });
    }
    setTotalTax(businessId, tax) {
        return __awaiter(this, void 0, void 0, function* () {
            const businessTax = yield prismaClient_1.default.businessPayments.create({
                data: {
                    businessId: businessId,
                    newBusiness: true,
                    amount: tax
                }
            });
            return businessTax;
        });
    }
    saveTaxOrderFile(businessId, fileURL) {
        return __awaiter(this, void 0, void 0, function* () {
            if (fileURL) {
                const taxOrderFile = yield prismaClient_1.default.files.create({
                    data: {
                        documentType: "Tax Order of Payment",
                        fileName: "Tax Order of Payment",
                        fileURL: fileURL,
                        businessId: businessId
                    }
                });
                return taxOrderFile;
            }
        });
    }
    getFormsForTax() {
        return __awaiter(this, void 0, void 0, function* () {
            const formsForApprovals = yield prismaClient_1.default.businessRegistry.findMany({
                where: {
                    approved: false
                },
                select: {
                    businessId: true,
                    businessName: true,
                    submittedAt: true,
                    mobile: true,
                    TIN: true,
                    owners: true,
                    approvals: true
                }
            });
            let approvedForms = [];
            formsForApprovals.forEach(form => {
                let count = 0;
                form.approvals.forEach(approval => {
                    if (approval.approved) {
                        count++;
                    }
                });
                if (count >= 6) {
                    approvedForms.push(form);
                }
            });
            return approvedForms;
        });
    }
    getApprovedForms() {
        return __awaiter(this, void 0, void 0, function* () {
            const approvedForms = yield prismaClient_1.default.businessRegistry.findMany({
                where: {
                    approved: true
                },
                select: {
                    businessId: true,
                    businessName: true,
                    submittedAt: true,
                    mobile: true,
                    TIN: true,
                    owners: true,
                    approvals: true
                }
            });
            return approvedForms;
        });
    }
    setFireTrackingNumber(businessId, trackingNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const trackNumber = yield prismaClient_1.default.businessRegistry.update({
                where: {
                    businessId: businessId,
                },
                data: {
                    trackNumber: trackingNumber
                }
            });
            return trackNumber;
        });
    }
    getProgress(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 6);
            const approval = yield prismaClient_1.default.businessApproval.findMany({
                where: {
                    officialId: userId,
                    approvedAt: {
                        gt: yesterday
                    }
                }
            });
            return approval.length;
        });
    }
}
exports.default = ApprovalModel;
//# sourceMappingURL=approvalModel.js.map