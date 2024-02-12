function login(req, res) {

    

   


}

function signUp(req, res) {
    const { email, password } = req.body;
    console.log(email, password)

    try {
        if (!email || !password) {
          throw new Error("Email and password not exist")
        }
        res.status(200).json({
            success: true,
            message: "Signup successful"
        })
    } catch (error) {
        console.log(error)

        res.status(400).json({
            success: false,
            message: error.message
        })
    }

}

module.exports = {
    login, signUp
}