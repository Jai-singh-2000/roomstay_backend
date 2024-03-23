const AdminOrder = require("../models/AdminOrderModel");
const Payment = require("../models/PaymentModel");
const Plan = require("../models/PlanModel");
const User = require("../models/UserModel");

async function getAdminOrder(req, res) {
  try {
    const { orderId } = req.params;
    const adminOrder = await AdminOrder.findOne({ _id: orderId });
    if (adminOrder) {
      res.status(200).json({
        success: true,
        order: adminOrder,
      });
      return;
    }
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function createAdminOrder(req, res) {
  try {
    const userId = req.userId;
    const {
      plan,
      razorpayId,
      razorpayPaymentId,
      razorpaySignature,
      paymentId,
    } = req.body;

    if (
      !plan ||
      !razorpayId ||
      !razorpayPaymentId ||
      !razorpaySignature ||
      !paymentId
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid request",
      });
      return;
    }

    // Is that plan exist or not
    const planDocument = await Plan.findOne({ _id: plan });
    if (!planDocument) {
      res.status(404).json({
        success: false,
        message: "Plan Not Found",
      });
      return;
    }

    // Is that same plan exist in user document
    const existingUser = await User.findOne({ _id: userId });
    if (existingUser.plan === planDocument?.name) {
      res.status(404).json({
        success: false,
        message: "Plan Already Exist",
      });
      return;
    }

    // Add paymentId and signature in payment document
    const existingPayment = await Payment.findOneAndUpdate(
      {
        razorpayId: razorpayId,
      },
      { razorpayPaymentId, razorpaySignature }
    );

    if (!existingPayment) {
      res.status(404).json({
        success: false,
        message: "Payment Not Found",
      });
      return;
    }

    const userDoc = await User.findOneAndUpdate(
      { _id: userId },
      { plan: planDocument?.name }
    );

    if (!userDoc) {
      res.status(404).json({
        success: false,
        message: "Plan Not Updated",
      });
      return;
    }

    const newOrder = {
      User: userId,
      Payment: paymentId,
      plan: plan,
    };

    const adminOrder = await AdminOrder.create(newOrder);
    if (adminOrder) {
      res.status(200).json({
        success: true,
        message: "Purchased successfully",
      });
      return;
    }
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

module.exports = { getAdminOrder, createAdminOrder };
