const User = require("../models/UserModel");

function login(req, res) {
    const { email, password } = req.body;

    try {

        if (!email || !password) {
            res.status(422).json({
                success: false,
                message: "Email and password not exist"
            })
        }
        res.status(200).json({
            success: true,
            message: "Login successful"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server not working"
        })
    }



}

async function signUp(req, res) {
    const { email, password,firstName,lastName } = req.body;
    console.log(req.body)

    try {
        if (!email || !password  || !firstName || !lastName) {
            res.status(422).json({
                success: false,
                message: "All fields are required"
            })
        }

        const response=await User.create({firstName,lastName,email,password})
        console.log(response)
        res.status(200).json({
            success: true,
            message: "Signup successful"
        })
    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server not working"
        })
    }

}

module.exports = {
    login, signUp
}