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
class PaymentModel {
    getPaymentBill(paymentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const bill = yield prismaClient_1.default.businessPayments.findUnique({
                where: {
                    paymentId: paymentId
                }
            });
            return bill;
        });
    }
    uploadBankReceipt(paymentId, receipt) {
        return __awaiter(this, void 0, void 0, function* () {
            const uploadReceeipt = yield prismaClient_1.default.businessPayments.update({
                where: {
                    paymentId: paymentId
                },
                data: {
                    receipt: receipt,
                    paid: true,
                    paidAt: new Date()
                }
            });
            return uploadReceeipt;
        });
    }
    uploadPaypalPayent(paymentId, transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const paypalPayment = yield prismaClient_1.default.businessPayments.update({
                where: {
                    paymentId: paymentId
                },
                data: {
                    transactionId: transactionId,
                    paid: true,
                    paidAt: new Date()
                }
            });
            return paypalPayment;
        });
    }
    confirmPayment(businessId) {
        return __awaiter(this, void 0, void 0, function* () {
            const confirmedPayment = yield prismaClient_1.default.businessRegistry.update({
                where: {
                    businessId: businessId
                },
                data: {
                    approved: true
                }
            });
            return confirmedPayment;
        });
    }
    getBankReceiptForms() {
        return __awaiter(this, void 0, void 0, function* () {
            const businessess = yield prismaClient_1.default.businessRegistry.findMany({
                where: {
                    approved: false
                },
                include: {
                    payments: true
                }
            });
            let businessPaid = [];
            businessess.forEach(business => {
                let count = 0;
                business.payments.forEach(payment => {
                    if (payment.receipt != null) {
                        count++;
                    }
                });
                if (count > 0) {
                    businessPaid.push(business);
                }
            });
            return businessPaid;
        });
    }
    rejectPayment(paymentId, rejectMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            const rejectedpayment = yield prismaClient_1.default.businessPayments.update({
                where: {
                    paymentId: paymentId
                },
                data: {
                    paid: false,
                    rejected: true,
                    rejectMessage: rejectMessage
                }
            });
            return rejectedpayment;
        });
    }
    getFormsForVerification() {
        return __awaiter(this, void 0, void 0, function* () {
            const forms = yield prismaClient_1.default.businessRegistry.findMany({
                where: {
                    AND: {
                        approved: false,
                        payments: {
                            some: {
                                paid: true
                            }
                        }
                    }
                },
                include: {
                    approvals: true,
                    addresses: true,
                    payments: true
                }
            });
            return forms;
        });
    }
}
exports.default = PaymentModel;
//# sourceMappingURL=paymentModel.js.map