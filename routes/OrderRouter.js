const express = require("express");
const route = express.Router();
const orderController = require("../controller/OrderController");

route.get("/order/:orderId", orderController.getAdminOrder);

module.exports = route;
