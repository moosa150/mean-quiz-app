const jwt = require("jsonwebtoken");
const User = require("../model/user");
module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      return res.json(403, {
        error: "Please login to perform an action",
        success: false,
      });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.json(400, {
        error: "Invalid token",
        success: false,
      });
    }
    const { userId } = decodedToken;
    const user = await User.findById(userId);
    if (!user) {
      return res.json(404, {
        error: "User not found",
      });
    }
    req.body.userId = userId;
    next();
  } catch (error) {
    return res.json(500, {
      error: error.message,
      success: false,
    });
  }
};
