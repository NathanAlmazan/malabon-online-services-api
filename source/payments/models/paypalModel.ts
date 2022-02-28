import braintree from "braintree";

const gateway = new braintree.BraintreeGateway({
    accessToken: process.env.PAYPAL_ACCESS_TOKEN as string,
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

class PaypalModel {

    async getClientToken() {
        const clientToken = await gateway.clientToken.generate({});

        return clientToken;
    }

    async paypalCheckout(amount: string, paymentNonce: string, deviceData: string) {   
        const paymentResult = await gateway.transaction.sale({
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
        })

        return paymentResult.transaction.id;
    }
}

export default PaypalModel;