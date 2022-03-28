import express from "express";
import BuildingPaymentService from "./services/buildingPayments";
import BusinessPayments from "./services/businessPayments";
import RealEstateService from "./services/realEstatePayments";

let paymentRouter = express.Router();

const businessPayments = new BusinessPayments();
const buildingPayments = new BuildingPaymentService();
const realEstatePayments = new RealEstateService();

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

paymentRouter.post('/estate/paypal', realEstatePayments.paymentWithPaypal);
paymentRouter.post('/estate/bank', realEstatePayments.paymentWithBankReceipt);
paymentRouter.get('/estate/bank/confirm/:paymentId', realEstatePayments.confirmBankPayment);
paymentRouter.post('/estate/reject', realEstatePayments.rejectPayment);
paymentRouter.get('/estate/verify', realEstatePayments.getPaymentsToVerify);

export default paymentRouter;