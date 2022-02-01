import React from 'react';
import './Cart.css'
import { useStripe, useElements, PaymentElement, CardNumberElement, CardExpiryElement, CardCvcElement, CardElement } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../functions/createPaymentIntent';

export default function CheckoutForm({ totalSellingPrice }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {

    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (totalSellingPrice !== 0) {
      createPaymentIntent({
        payable_amount: totalSellingPrice
      }).then((res) => {
        
        stripe.confirmCardPayment(res.data,
          {
            payment_method: {
              card: elements.getElement(CardElement),
            }
          }).then((result) => {
            if (result.error) {
              console.log(result.error.message);
            }
          });
      })
    }

  }

  return (
    <form className="cart__payment" onSubmit={handleSubmit}>

      <CardElement />
      <div className="cart__payBtn">
        <button type="submit">PAY &#8377;{totalSellingPrice}</button>
      </div>
    </form>
  );
}
