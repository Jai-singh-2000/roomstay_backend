const jwt = require("jsonwebtoken");
const authToken = (req, res, next) => {
  try {
    const SECRET_KEY_JWT = process.env.JWT_SECRET_KEY;
    const token = req.headers.authorization.split(" ")[1];

    const data = jwt.verify(token, SECRET_KEY_JWT);

    if (!data?.id) {
      res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
      return;
    }

    req.userId = data?.id;
    next();
  
  } catch (error) {
    console.log(error, "token error");
    res.status(500).json({
      success: false,
      message: "Token verify error",
    });
  }
};

module.exports = authToken;
