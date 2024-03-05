const jwtToken = require("jsonwebtoken");
const Otp = require("../models/OtpModel");
const User = require("../models/UserModel");
const sendNewMail = require("../config/mail");
const { generateOTP } = require("../utils/tools");

async function loginController(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(422).json({
                success: false,
                message: "Email and password not exist"
            })
        }

        const existingUser = await User.findOne({ email: email })

        if (existingUser?.password !== password) {
            res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const token = await jwtToken.sign({
            id: existingUser._id,
        }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })

        res.status(200).json({
            success: true,
            message: "Login successfuly",
            token: token
        })


    } catch (error) {
        console.log("Yaha aaya", error)
        res.status(500).json({
            success: false,
            message: "Server not working"
        })
    }
}

async function signUpController(req, res) {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    console.log("chlaa")

    try {
        if (!email || !password || !firstName || !lastName) {

            res.status(422).json({
                success: false,
                message: "All fields are required"
            })
            return;

        }
        else if (password !== confirmPassword) {

            res.status(422).json({
                success: false,
                message: "Password and confirm password not matched"
            })
            return;
        }

        const existingUser = await User.findOne({ email: email })

        if (existingUser?.email) {

            res.status(401).json({
                success: false,
                message: "User already exist"
            })
            return;
        }



        const signUpResponse = await User.create({ firstName, lastName, email, password })

        const randomOtp = generateOTP();
        const otpResponse = await Otp.create({ email: email, otp: randomOtp })
        sendNewMail({mail:email,subject:"Signup at Roomstay",text:`Use this OTP to verify this account ${randomOtp}`})
        res.status(200).json({
            success: true,
            message: `Otp send at ${email}`,
        })


    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server not working"
        })
    }

}

async function otpController(req, res) {
    try {

        const { email, otp } = req.body;

        const existingUser = await User.findOne({ email: email })
        if (!existingUser) {
            res.status(401).json({
                success: false,
                message: "User does not exist"
            })
            return;
        }

        if (existingUser?.isVerified) {
            res.status(200).json({
                success: true,
                message: "User already verified"
            })
            return;
        }

        const existingObj = await Otp.findOne({ email: email })
        console.log(existingObj?.otp === String(otp))

        if (!existingObj) {
            res.status(401).json({
                success: false,
                message: "Something is wrong"
            })
            return;
        }



        if (existingObj?.otp === String(otp)) {
            await User?.findOneAndUpdate({ email: email }, { isVerified: true })
            res.status(200).json({
                success: true,
                message: "User verified"
            })
        }

        res.status(409).json({
            success: true,
            message: "Something is wrong"
        })


    } catch (error) {
        console.log(error, "otp me aaya")
        res.status(500).json({
            success: false,
            message: "Server not working"
        })
    }
}

async function resendOtpController(req, res) {
    try {
        const { email } = req.body;



        const existingUser = await User.findOne({ email: email })

        if (!existingUser) {
            res.status(401).json({
                success: false,
                message: "User does not exist"
            })
        }

        if (!existingUser.isVerified) {
            const randomOtp = generateOTP();
            await Otp?.findOneAndUpdate({ email: email }, { otp: randomOtp })
            res.status(200).json({
                success: true,
                message: "Succuss",
                otp: randomOtp
            })

        } else {
            res.status(401).json({
                success: false,
                message: "User already verified"
            })
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server not working"
        })
    }
}

async function forgetController(req, res) {

    try {

        const { email } = req.body;
        const existingUser = await User.findOne({ email: email });

        if (!existingUser?.email) {
            res.status(401).json({
                success: false,
                message: "User does not exist"
            })

        }

        if (existingUser.email) {

            const randomOtp = generateOTP();
            const otpResponse = await Otp.findOneAndUpdate({ email: email }, { otp: randomOtp })

            if (otpResponse) {
                res.status(200).json({
                    success: true,
                    message: `Otp send at ${email}`,
                    otp: randomOtp
                })
                return;
            }

        }

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Something is error"
        })
    }

}

async function changePasswordController(req, res) {

    try {

        const { email, otp, password, confirmPassword } = req.body;

        if (!email || !otp || !password || !confirmPassword) {
            res.status(404).json({
                message: "Something is missing",
                status: false,
            });
            return;
        }

        if (password !== confirmPassword) {
            res.status(409).json({
                message: "Password and confirm password did not matched",
                status: false,
            });
            return;
        }

        const existingUser = await User.findOne({ email: email })

        if (!existingUser) {
            res.status(401).json({
                success: false,
                message: "User not found"
            })
        }

        const existOtpObj = await Otp.findOne({ email: email })

        if (!existOtpObj.otp) {
            res.status(401).json({
                success: false,
                message: "Something is missing"
            })
            return;
        }



        if (existOtpObj.otp !== String(otp)) {
            res.status(401).json({
                success: false,
                message: "Otp did not match"
            })
            return;
        }

        const userObj = await User.findOneAndUpdate({ email: email, password: password })
        console.log(userObj, "check")
        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(401).json({
            success: false,
            message: "Something is error"
        })
    }

}

async function userAccountDeleteController(req, res) {
    try {
        const userId=req.userId;

        const deleteAcc = await User.deleteOne({ _id: userId })
        if (deleteAcc) {
            res.status(200).json({
                success: true,
                message: "User deleted successfully"
            })
        }else{

            res.status(409).json({
                success: true,
                message: "Something is wrong"
            })
        }
    } catch (error) {
        console.log(error, "err")
        res.status(401).json({
            success: false,
            message: "something is wrong please try again"
        })
        return;
    }
}

module.exports = {
    loginController, signUpController, otpController, resendOtpController, forgetController, changePasswordController, userAccountDeleteController
}