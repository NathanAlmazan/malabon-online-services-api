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
Object.defineProperty(exports, "__esModule", { value: true });
const sdk = require('api')('@paymongo/v1#3pyid3fkywdbsr8');
sdk.auth(process.env.PAYMONGO_SECRET_KEY, process.env.PAYMONGO_SECRET_KEY);
class PaymongoModel {
    createPaymentIntent(paymentAmount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield sdk['create-a-paymentintent']({
                    data: {
                        attributes: {
                            amount: 10000,
                            payment_method_allowed: ['card', 'paymaya'],
                            payment_method_options: { card: { request_three_d_secure: 'any' } },
                            currency: 'PHP'
                        }
                    }
                });
                return result;
            }
            catch (err) {
                return err;
            }
        });
    }
    payWithCard(cardNumber, expMonth, expYear, cvc) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = sdk['create-a-paymentmethod']({
                    data: {
                        attributes: {
                            details: { card_number: cardNumber, exp_month: expMonth, exp_year: expYear, cvc: cvc },
                            type: 'card'
                        }
                    }
                });
                return { result: result.data.id };
            }
            catch (err) {
                return { errors: err };
            }
        });
    }
    attachCardPayment(intentId, methodId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = sdk['attach-to-paymentintent']({
                    data: {
                        attributes: {
                            payment_method: methodId,
                            return_url: 'http://localhost:3000'
                        }
                    }
                }, { id: intentId });
                return { result: result.data.attributes.status };
            }
            catch (err) {
                return { errors: err };
            }
        });
    }
}
exports.default = PaymongoModel;
//# sourceMappingURL=paymongoModel.js.map