const jwt = require("jsonwebtoken")
const authToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = data.id
        next();

    } catch (error) {
        console.log(error)
        res.status(401).json({
            success: false,
            message: "Token not available"
        })
    }

}


module.exports = authToken