import GooglePayButton from "@google-pay/button-react";
// import { PaymentMethodType, TokenizationSpecificationType } from '@google-pay/button-js';
import React from "react";

function GooglePyment({ price, isDisabled }) {
  const buttonStyle = isDisabled ? { pointerEvents: "none" } : {};
  return (
    <div>
      <hr />
      <GooglePayButton
        environment="TEST"
        paymentRequest={{
          environment: "TEST",
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: "CARD",
              parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["MASTERCARD", "VISA"],
              },
              tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                  gateway: "example",
                  gatewayMerchantId: "exampleGatewayMerchantId",
                },
              },
            },
          ],

          merchantInfo: {
            merchantId: "12345678901234567890",
            merchantName: "Demo Merchant",
          },
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPriceLabel: "Total",
            totalPrice: price.toString(),
            currencyCode: "INR",
            countryCode: "IN",
          },

          shippingAddressRequired: true,
          callbackIntents: ["SHIPPING_ADDRESS", "PAYMENT_AUTHORIZATION"],
        }}
        onLoadPaymentData={(paymentRequest) => {
          console.log("Success", paymentRequest);
        }}
        onPaymentAuthorized={(paymentData) => {
          console.log("Payment Authorised Success", paymentData);
          return { transactionState: "SUCCESS" };
        }}
        onPaymentDataChanged={(paymentData) => {
          console.log("On Payment Data Changed", paymentData);
          return {};
        }}
        existingPaymentMethodRequired="false"
        buttonColor="default"
        buttonType="pay"
        style={buttonStyle}
      />
    </div>
  );
}

export default GooglePyment;
