function login(req,res) {
    console.log("chalala")
    res.status(200).json({
        token:"askdffjsldkfj"
    })
}

function signUp() {
    const obj = req.body;
    if (obj.email) {

    }
    if (obj.password) {

    }
    res.send("Login")
}

module.exports = {
    login, signUp
}