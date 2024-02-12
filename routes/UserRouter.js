const express=require("express")
const route=express.Router()
const userController=require("../controller/UserController")
const authToken=require("../middlewares/tokenMiddleware")

route.post("/login",userController.login)

route.post("/signup",userController.signUp)


module.exports=route