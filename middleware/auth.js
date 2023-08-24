const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const auth = async (req, res, next) => {
  let token;
  let decoded;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401).json({
        message: "Auth token has expired!",
        message2: error.message,
        message3: req.user,
        message4: decoded,
        message5: token,
      });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Unauthorized! No token provided!" });
  }
};

module.exports = { auth };
