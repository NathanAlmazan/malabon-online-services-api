"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const buildingPayments_1 = __importDefault(require("./services/buildingPayments"));
const businessPayments_1 = __importDefault(require("./services/businessPayments"));
let paymentRouter = express_1.default.Router();
const businessPayments = new businessPayments_1.default();
const buildingPayments = new buildingPayments_1.default();
paymentRouter.get('/paypal/client', businessPayments.getPaypalClientKey);
paymentRouter.post('/business/paypal', businessPayments.paymentWithPaypal);
paymentRouter.post('/business/bank', businessPayments.paymentWithBankReceipt);
paymentRouter.get('/business/bank/confirm/:paymentId', businessPayments.confirmBankPayment);
paymentRouter.post('/reject', businessPayments.rejectPayment);
paymentRouter.get('/business/verify', businessPayments.getPaymentsToVerify);
paymentRouter.post('/renew/paypal', businessPayments.paymentWithPaypalRenew);
paymentRouter.get('/renew/verify', businessPayments.getPaymentsToVerifyRenew);
paymentRouter.get('/renew/bank/confirm/:paymentId', businessPayments.confirmBankPaymentRenew);
paymentRouter.post('/building/paypal', buildingPayments.paymentWithPaypal);
paymentRouter.post('/building/bank', buildingPayments.paymentWithBankReceipt);
paymentRouter.get('/building/bank/confirm/:paymentId', buildingPayments.confirmBankPayment);
paymentRouter.post('/building/reject', buildingPayments.rejectPayment);
paymentRouter.get('/building/verify', buildingPayments.getPaymentsToVerify);
exports.default = paymentRouter;
//# sourceMappingURL=index.js.map