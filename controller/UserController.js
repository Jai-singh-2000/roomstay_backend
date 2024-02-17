const jwtToken = require("jsonwebtoken");
const Otp = require("../models/OtpModel");
const User = require("../models/UserModel");
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

    try {
        if (!email || !password || !firstName || !lastName) {

            res.status(422).json({
                success: false,
                message: "All fields are required"
            })

        }
        else if (password !== confirmPassword) {

            res.status(422).json({
                success: false,
                message: "Password and confirm password not matched"
            })

        }

        const existingUser = await User.findOne({ email: email })

        if (existingUser?.email) {

            res.status(401).json({
                success: false,
                message: "User already exist"
            })

        }

        const signUpResponse = await User.create({ firstName, lastName, email, password })

        const randomOtp = generateOTP();
        const otpResponse = await Otp.create({ email: email, otp: randomOtp })

        res.status(200).json({
            success: true,
            message: "Signup successful",
            otp: randomOtp
        })





    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server not working"
        })
    }

}


function otpController() {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            res.status(422).json({
                success: false,
                message: "Something is missing",
            });
        }


        const randomOtp = generateOTP();

        console.log(randomOtp)


    } catch (error) {
        console.log(error, "otp me aaya")
        res.status(500).json({
            success: false,
            message: "Server not working"
        })
    }
}


module.exports = {
    loginController, signUpController, otpController
}