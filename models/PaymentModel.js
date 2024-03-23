const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    razorpayId: {
      type: String,
      required: true,
    },
    entity: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    receipt: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      require: true,
      default: Date.now(),
    },
    razorpayPaymentId: {
      type: String,
      required: true,
      default:null
    },
    razorpaySignature: {
      type: String,
      required: true,
      default:null
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
