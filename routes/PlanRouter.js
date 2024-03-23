const express=require("express")
const route=express.Router()
const planController=require("../controller/PlanController")

route.get("/plans",planController.getAllPlans)

module.exports=route;