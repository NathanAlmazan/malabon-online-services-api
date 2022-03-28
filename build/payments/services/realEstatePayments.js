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
const globalErrors_1 = __importDefault(require("../../globalErrors"));
const estatePaymentModel_1 = __importDefault(require("../models/estatePaymentModel"));
const paypalModel_1 = __importDefault(require("../models/paypalModel"));
const paymentModel = new estatePaymentModel_1.default();
const paypalModel = new paypalModel_1.default();
class RealEstateService {
    paymentWithBankReceipt(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const paymentId = req.body.paymentId;
            const receiptURL = req.body.receiptURL;
            if (!paymentId || !receiptURL) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Incomplete arguments.");
                return next(nullArgumentError);
            }
            try {
                const taxBill = yield paymentModel.getPaymentBill(paymentId);
                if (!taxBill) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("tax Order of Payment not found.");
                    return next(notFoundError);
                }
                const submitPayment = yield paymentModel.uploadBankReceipt(paymentId, receiptURL);
                return res.status(200).json(submitPayment);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    paymentWithPaypal(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const paymentId = req.body.paymentId;
            const paymentNonce = req.body.paymentNonce;
            const amount = req.body.amount;
            const deviceData = req.body.deviceData;
            if (!paymentId || !paymentNonce || !amount || !deviceData) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Incomplete arguments.");
                return next(nullArgumentError);
            }
            try {
                const taxBill = yield paymentModel.getPaymentBill(paymentId);
                if (!taxBill) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("Tax Order of Payment not found.");
                    return next(notFoundError);
                }
                const paypalPayment = yield paypalModel.paypalCheckout(taxBill.amount.toFixed(2), paymentNonce, deviceData);
                const savePayment = yield paymentModel.uploadPaypalPayent(paymentId, paypalPayment);
                const confirmPayment = yield paymentModel.confirmPayment(savePayment.estateId);
                return res.status(200).json({ transactionId: paypalPayment, business: confirmPayment });
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    confirmBankPayment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const paymentId = parseInt(req.params.paymentId);
            if (isNaN(paymentId)) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Invalid payment ID.");
                return next(nullArgumentError);
            }
            try {
                const taxBill = yield paymentModel.getPaymentBill(paymentId);
                if (!taxBill) {
                    const notFoundError = new globalErrors_1.default.NotFoundError("Tax Order of Payment not found.");
                    return next(notFoundError);
                }
                const confirmPayment = yield paymentModel.confirmPayment(taxBill.estateId);
                return res.status(200).json({ receipt: taxBill.receipt, business: confirmPayment });
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    rejectPayment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const paymentId = req.body.paymentId;
            const rejectMessage = req.body.rejectMessage;
            if (!paymentId || !rejectMessage) {
                const nullArgumentError = new globalErrors_1.default.NullArgumentError("Payment ID and message is required.");
                return next(nullArgumentError);
            }
            try {
                const rejected = yield paymentModel.rejectPayment(paymentId, rejectMessage);
                return res.status(200).json(rejected);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
    getPaymentsToVerify(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const forms = yield paymentModel.getFormsForVerification();
                return res.status(200).json(forms);
            }
            catch (error) {
                const internalError = new globalErrors_1.default.InternalError(error.message);
                return next(internalError);
            }
        });
    }
}
exports.default = RealEstateService;
//# sourceMappingURL=realEstatePayments.js.map