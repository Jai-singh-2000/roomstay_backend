const mongoose = require("mongoose");

const adminOrderSchema = new mongoose.Schema(
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
    plan:{
        enum:["silver","gold"],
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);

const UserOrder = mongoose.model("UserOrder", adminOrderSchema);

module.exports = UserOrder;
