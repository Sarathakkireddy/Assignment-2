const jwt = require("jsonwebtoken");
const userModel = require("../models/Users");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("pass")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.secret);
      const user = await userModel.findById(decoded.id).select("-password");
      req.user=user._id;
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      res.json({ message: error.message });
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(400);
    res.json({ message: "Not authorized, no token" });
  }
};


module.exports = {protect};