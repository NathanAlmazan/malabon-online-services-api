import { NextFunction, Request, Response } from "express";
import GlobalErrors from "../../globalErrors";
import BuildingPaymentModel from "../models/buildingPaymentModel";
import PaypalModel from "../models/paypalModel";

const paymentModel = new BuildingPaymentModel();
const paypalModel = new PaypalModel();

class BuildingPaymentService {
    async paymentWithBankReceipt(req: Request, res: Response, next: NextFunction) {
        const paymentId: number | undefined = req.body.paymentId;
        const receiptURL: string | undefined = req.body.receiptURL;

        if (!paymentId || !receiptURL) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Incomplete arguments.");
            return next(nullArgumentError);
        }

        try {
            const taxBill = await paymentModel.getPaymentBill(paymentId);

            if (!taxBill) {
                const notFoundError = new GlobalErrors.NotFoundError("tax Order of Payment not found.");
                return next(notFoundError);
            }

            const submitPayment = await paymentModel.uploadBankReceipt(paymentId, receiptURL);

            return res.status(200).json(submitPayment);
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async paymentWithPaypal(req: Request, res: Response, next: NextFunction) {
        const paymentId: number | undefined = req.body.paymentId;
        const paymentNonce: string | undefined = req.body.paymentNonce;
        const amount: number | undefined = req.body.amount;
        const deviceData: string | undefined = req.body.deviceData;

        if (!paymentId || !paymentNonce || !amount || !deviceData) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Incomplete arguments.");
            return next(nullArgumentError);
        }

        try {
            const taxBill = await paymentModel.getPaymentBill(paymentId);

            if (!taxBill) {
                const notFoundError = new GlobalErrors.NotFoundError("Tax Order of Payment not found.");
                return next(notFoundError);
            }

            const paypalPayment = await paypalModel.paypalCheckout(taxBill.amount.toFixed(2), paymentNonce, deviceData);
            const savePayment = await paymentModel.uploadPaypalPayent(paymentId, paypalPayment);
            const confirmPayment = await paymentModel.confirmPayment(savePayment.buildingId as number);

            return res.status(200).json({ transactionId: paypalPayment, business: confirmPayment });

        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async confirmBankPayment(req: Request, res: Response, next: NextFunction) {
        const paymentId = parseInt(req.params.paymentId);

        if (isNaN(paymentId)) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Invalid payment ID.");
            return next(nullArgumentError);
        }

        try {
            const taxBill = await paymentModel.getPaymentBill(paymentId);

            if (!taxBill) {
                const notFoundError = new GlobalErrors.NotFoundError("Tax Order of Payment not found.");
                return next(notFoundError);
            }

            const confirmPayment = await paymentModel.confirmPayment(taxBill.buildingId as number);

            return res.status(200).json({ receipt: taxBill.receipt, business: confirmPayment });

        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async rejectPayment(req: Request, res: Response, next: NextFunction) {
        const paymentId: number | undefined = req.body.paymentId;
        const rejectMessage: string | undefined = req.body.rejectMessage;

        if (!paymentId || !rejectMessage) {
            const nullArgumentError = new GlobalErrors.NullArgumentError("Payment ID and message is required.");
            return next(nullArgumentError);
        }

        try {
            const rejected = await paymentModel.rejectPayment(paymentId, rejectMessage);

            return res.status(200).json(rejected);
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }

    async getPaymentsToVerify(req: Request, res: Response, next: NextFunction) {
        try {
            const forms = await paymentModel.getFormsForVerification();

            return res.status(200).json(forms);
        } catch (error) {
            const internalError = new GlobalErrors.InternalError((error as Error).message);
            return next(internalError);
        }
    }
}

export default BuildingPaymentService;