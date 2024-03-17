const mongoose = require("mongoose");

const userOrderSchema = new mongoose.Schema(
  {
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    orderItems: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Room",
          required: true,
        }
      ],
    },
  },
  { timestamps: true }
);

const UserOrder = mongoose.model("UserOrder", userOrderSchema);

module.exports = UserOrder;
