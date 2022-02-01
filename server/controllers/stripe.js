const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {

  // create payment intent with order amount and currency

  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.payable_amount * 100,
    currency: "INR",
  }).catch(err => {console.log(err.message)});



  res.send(
    paymentIntent.client_secret
  );
};
