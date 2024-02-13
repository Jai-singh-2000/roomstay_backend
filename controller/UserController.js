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

function signUp(req, res) {
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
            message: "Signup successful"
        })
    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server not working"
            // message: error.message
        })
    }

}

module.exports = {
    login, signUp
}