import express from "express";
import BusinessPayments from "./services/businessPayments";

let paymentRouter = express.Router();

const businessPayments = new BusinessPayments();

paymentRouter.get('/paypal/client', businessPayments.getPaypalClientKey);
paymentRouter.post('/business/paypal', businessPayments.paymentWithPaypal);
paymentRouter.post('/business/bank', businessPayments.paymentWithBankReceipt);
paymentRouter.get('/business/bank/confirm/:paymentId', businessPayments.confirmBankPayment);
paymentRouter.post('/reject', businessPayments.rejectPayment);
paymentRouter.get('/business/verify', businessPayments.getPaymentsToVerify);

export default paymentRouter;