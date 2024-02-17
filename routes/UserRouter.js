const express = require("express")
const route = express.Router()
const userController = require("../controller/UserController")
const authToken = require("../middlewares/tokenMiddleware")

route.post("/login", authToken, userController.loginController)

route.post("/signup", userController.signUpController)

route.post("/otp", userController.otpController)

route.post("/resendOtp",userController.resendOtpController )


module.exports = route