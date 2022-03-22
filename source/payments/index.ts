import express from "express";
import BuildingPaymentService from "./services/buildingPayments";
import BusinessPayments from "./services/businessPayments";

let paymentRouter = express.Router();

const businessPayments = new BusinessPayments();
const buildingPayments = new BuildingPaymentService();

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

export default paymentRouter;