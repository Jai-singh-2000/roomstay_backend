const express = require("express");
const route = express.Router();
const PaymentController = require("../controller/PaymentController");

route.post("/paymentInit", PaymentController.paymentInit);


module.exports = route;
