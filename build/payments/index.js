"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const businessPayments_1 = __importDefault(require("./services/businessPayments"));
let paymentRouter = express_1.default.Router();
const businessPayments = new businessPayments_1.default();
paymentRouter.get('/paypal/client', businessPayments.getPaypalClientKey);
paymentRouter.post('/business/paypal', businessPayments.paymentWithPaypal);
paymentRouter.post('/business/bank', businessPayments.paymentWithBankReceipt);
paymentRouter.get('/business/bank/confirm/:paymentId', businessPayments.confirmBankPayment);
paymentRouter.post('/reject', businessPayments.rejectPayment);
paymentRouter.get('/business/verify', businessPayments.getPaymentsToVerify);
exports.default = paymentRouter;
//# sourceMappingURL=index.js.map