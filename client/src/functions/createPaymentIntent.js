import axios from 'axios';

export const createPaymentIntent = async ( payableAmount) => 
  await axios.post(process.env.REACT_APP_API+"/create-payment-intent", payableAmount)