const express=require("express")
const route=express.Router()
const userController=require("../controller/UserController")
const authToken=require("../middlewares/tokenMiddleware")

route.post("/login",authToken,userController.login)

route.post("/sigup",authToken,userController.signUp)


module.exports=route