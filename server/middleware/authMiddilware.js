const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const userAuthenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token required" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by decoded ID and exclude the password
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }
    next(); // Pass control to the next handler
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

const adminAuthenticateToken = (req, res, next) => {
  userAuthenticateToken(req, res, () => {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      res.status(401).json({ message: "Not authorized as an admin" });
    }
  });
};

module.exports = { userAuthenticateToken, adminAuthenticateToken };
