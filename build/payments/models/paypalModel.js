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
const braintree_1 = __importDefault(require("braintree"));
const gateway = new braintree_1.default.BraintreeGateway({
    accessToken: process.env.PAYPAL_ACCESS_TOKEN,
    environment: braintree_1.default.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
});
class PaypalModel {
    getClientToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const clientToken = yield gateway.clientToken.generate({});
            return clientToken;
        });
    }
    paypalCheckout(amount, paymentNonce, deviceData) {
        return __awaiter(this, void 0, void 0, function* () {
            const paymentResult = yield gateway.transaction.sale({
                amount: amount,
                merchantAccountId: "PHP",
                paymentMethodNonce: paymentNonce,
                deviceData: deviceData,
                options: {
                    paypal: {
                        customField: "Tax Order iof Payment",
                        description: "Payment for your new Malabon Business Permit"
                    },
                    submitForSettlement: true
                }
            });
            return paymentResult.transaction.id;
        });
    }
}
exports.default = PaypalModel;
//# sourceMappingURL=paypalModel.js.map