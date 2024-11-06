const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");

// Configure multer storage
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
const storage = multer.diskStorage({
  destination: "./public/uploads/", // Store uploaded images in the "uploads" folder
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file names
  },
});
const upload = multer({ storage });
const updateProfile = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);

    // Check for required fields
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Prepare updated data
    const updatedData = {};
    if (username) {
      updatedData.username = username;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(password, salt); // Fixed 'this.password' to 'password'
    }
    if (req.file) {
      updatedData.profileImage = `/public/uploads/${req.file.filename}`; // Ensure correct path
    }

    // Update the user details in the database
    const updatedUser = await User.findOneAndUpdate({ email }, updatedData, {
      new: true,
      runValidators: true, // Optional: ensures that validation is applied to updated data
    });
    const token = generateToken(user._id);
    res.json({ success: true, user: updatedUser, token: token });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({
      success: false,
      message: "Profile update failed",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "no user exists" });
    }

    if (user && (await user.matchPassword(password))) {
      res.json({
        username: user.username,
        _id: user._id,
        token: generateToken(user._id),
        email: user.email,
        profileImage: user.profileImage,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error in login  of user", error: error.message });
  }
};
const registerUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Check if all fields are provided
    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create new user with hashed password
    const newUser = new User({
      email,
      password,
      username,
    });

    await newUser.save();
    // Respond with success message and appropriate status
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in registration of user:", error);
    res
      .status(500)
      .json({ message: "Error in registration of user", error: error.message });
  }
};
const getUserProfile = async (req, res) => {
  try {
    console.log("user", req.user);
    if (req.user) {
      const user = await User.findById(req.user._id);
      res.json({
        _id: req.user._id,
        username: req.user.username,
        email: req.user.email,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  loginUser,
  registerUser,
  getUserProfile,
  updateProfile: [upload.single("profileImage"), updateProfile],
};
