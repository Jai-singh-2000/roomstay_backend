const express = require("express");
const route = express.Router();
const planController = require("../controller/PlanController");

route.get("/plans", planController.getAllPlans);

route.post("/createPlan", planController.addNewPlan);

module.exports = route;
