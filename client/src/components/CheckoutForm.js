import React, { useEffect, useState } from 'react';
import './Cart.css'
import { useStripe, useElements, PaymentElement, CardNumberElement, CardExpiryElement, CardCvcElement, CardElement } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../functions/createPaymentIntent';
import { insertOrders } from '../functions/order';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function CheckoutForm({ totalSellingPrice, cartItems, userId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const handleSubmit = async (event) => {

    event.preventDefault();
    setIsLoading(true)
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
                insertOrders({ userId: userId, orders: cartItems })
                  .then((res) => {
                    setIsLoading(false)
                    dispatch({ type: 'ADD_TO_CART', payload: '[]'})
                    navigate('/orders')
                  })
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
      <p style={{ fontSize: '12px' }}>Try it out using the test card number 4242 4242 4242 4242,<br /> a random three-digit CVC number and any expiration date in the future.</p>

      <div className="cart__payBtn" style={{ display: 'flex', justifyContent: 'center' }}>
        <button type="submit"  disabled={isLoading}>
          {isLoading ?
            <div className="spinner-container">
              <div className="spinner-border text-light" role="status">
                <span className="sr-only"></span>
              </div>
            </div> :
            "PAY ₹"+totalSellingPrice
          }
          
        </button>
      </div>
    </form>
  );
}
