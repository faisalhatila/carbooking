const jwt = require("jsonwebtoken");

exports.checkAuth = (req, res, next) => {
  console.log("checking token", { req: req.headers });
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "You are not authorized to proceed",
      error: error,
    });
  }
};
