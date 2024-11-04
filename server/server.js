const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./router/userRoutes");
const adminRouter = require("./router/adminRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
const noCache = (req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, max-age=0"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
};
app.use(noCache);
app.use(
  cors({
    origin: process.env.LOCAL_HOST,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI);

app.use("/", userRouter);
app.use("/admin", adminRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost/${process.env.PORT}`);
});
