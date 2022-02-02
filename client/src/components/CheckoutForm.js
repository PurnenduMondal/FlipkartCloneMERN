import React, { useEffect } from 'react';
import './Cart.css'
import { useStripe, useElements, PaymentElement, CardNumberElement, CardExpiryElement, CardCvcElement, CardElement } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../functions/createPaymentIntent';
import { insertOrders } from '../functions/order';

export default function CheckoutForm({ totalSellingPrice, cartItems, userId }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {

    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (totalSellingPrice !== 0) {
      createPaymentIntent({ payable_amount: totalSellingPrice })
        .then((res) => {
          stripe.confirmCardPayment(res.data,
            {
              payment_method: { card: elements.getElement(CardElement) }
            })
            .then((result) => {
              if (result.error) {
                console.log(result.error.message);
              }
              else {
                insertOrders({userId: userId, orders: cartItems})
                .then((res) => console.log(res.data))
              }
            });
        })
    }
  }
  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  return (
    <form className="cart__payment" onSubmit={handleSubmit}>
      <div style={{ border: '1px solid #b1b1b1', padding: "15px 5px", marginBottom: '14px', borderRadius: '5px' }}>
        <CardElement options={cartStyle} />
      </div>


      <div className="cart__payBtn" style={{ display: 'flex', justifyContent: 'center' }}>
        <button type="submit">PAY &#8377;{totalSellingPrice}</button>
      </div>
    </form>
  );
}
