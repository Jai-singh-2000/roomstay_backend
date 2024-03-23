const AdminOrder = require("../models/AdminOrderModel");

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
    const { payment, plan } = req.body;

    const newOrder={
        User:userId,
        Payment:payment,
        plan:plan,
    }
    const adminOrder = await AdminOrder.create(newOrder);
    if (adminOrder) {
      res.status(200).json({
        success: true,
        message: "Order created successfully",
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

module.exports = { getAdminOrder,createAdminOrder };
