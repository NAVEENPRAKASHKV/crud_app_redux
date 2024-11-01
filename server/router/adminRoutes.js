const express = require("express")
const {loginAdmin,getUsers}= require("../controller/adminController")
const {adminAuthenticateToken} = require("../middleware/authMiddilware")
const router = express.Router()

router.post("/login",loginAdmin)
router.get("/getusers",adminAuthenticateToken,getUsers)


module.exports = router