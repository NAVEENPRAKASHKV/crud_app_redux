const express = require("express");
const mongoose = require("mongoose");
const userRouter =require("./router/userRoutes")
const adminRouter =require("./router/adminRoutes")
require('dotenv').config()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI);


app.use("/",userRouter)
app.use("/admin",adminRouter)

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
