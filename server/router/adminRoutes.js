const express = require("express");
const { getUsers } = require("../controller/adminController");
const { adminAuthenticateToken } = require("../middleware/authMiddilware");
const router = express.Router();

router.get("/users", getUsers);

module.exports = router;
