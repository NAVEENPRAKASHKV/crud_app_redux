const express = require("express");
const {
  loginUser,
  registerUser,
  getUserProfile,
  updateProfile,
} = require("../controller/userController");
const { userAuthenticateToken } = require("../middleware/authMiddilware");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/profile", userAuthenticateToken, getUserProfile);
router.post("/update-profile", userAuthenticateToken, updateProfile);

module.exports = router;
