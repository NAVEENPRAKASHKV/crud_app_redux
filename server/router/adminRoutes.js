const express = require("express");
const {
  getUsers,
  deleteUser,
  createUser,
  updateUser,
} = require("../controller/adminController");
const { adminAuthenticateToken } = require("../middleware/authMiddilware");
const router = express.Router();

router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);
router.post("/users/create", createUser);
router.put("/users/:id", updateUser);

module.exports = router;
