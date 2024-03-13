const Payment = require("../models/PaymentModel");
const Razorpay = require("razorpay");

const paymentInit = async (req, res) => {
  const { amount } = req.body;
  const userId = req.userId;

  if (!amount) {
    res.status(404).json({
      success: false,
      message: "Please enter amount",
    });
  }

  // initializing razorpay
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  // setting up options for razorpay order.
  const options = {
    amount: amount,
    currency: "INR",
    receipt: "any unique id for every order",
    payment_capture: 1,
  };

  try {
    const response = await razorpay.orders.create(options);

    if (!response) {
      res.status(404).json({
        success: false,
        message: "Payment not initialized",
      });
    }

    const { id, entity, amount, currency, receipt, created_at } = response;
    const payment = await Payment.create({
      User: userId,
      razorpayId: id,
      entity,
      amount,
      currency,
      receipt,
      created_at,
    });

    if (!payment) {
      res.status(404).json({
        success: false,
        message: "Payment not saved",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        order_id: id,
        currency: currency,
        amount: amount,
        KEY_ID:process.env.RAZORPAY_KEY_ID
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { paymentInit };
