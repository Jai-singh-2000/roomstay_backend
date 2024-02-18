const express = require("express")
const route = express.Router()
const userController = require("../controller/UserController")
const authToken = require("../middlewares/tokenMiddleware")

route.post("/login", authToken, userController.loginController)

route.post("/signup", userController.signUpController)

route.post("/otpVerify", userController.otpController)

route.post("/resendOtp",userController.resendOtpController )

route.post("/forget", userController.forgetController)



route.post("/changePassword", userController.changePasswordController)


module.exports = route