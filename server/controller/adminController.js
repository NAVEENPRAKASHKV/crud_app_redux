const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const multer = require("multer");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const getUsers = async (req, res) => {
  try {
    console.log("fetching user data");
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    console.log("deleting the user form the server");
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.deleteOne();
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    console.log(email, password, username, req.body);

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

    const user = await newUser.save();
    // Respond with success message and appropriate status
    res.status(201).json(user);
  } catch (error) {
    console.error("Error in registration of user:", error);
    res
      .status(500)
      .json({ message: "Error in registration of user", error: error.message });
  }
};

const storage = multer.diskStorage({
  destination: "./public/uploads/", // Store uploaded images in the "uploads" folder
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file names
  },
});
const upload = multer({ storage });

const updateUser = async (req, res) => {
  try {
    const { email, username, role } = req.body;
    console.log("Request body in updateUser:", req.body);

    // Check if all fields are provided
    if (!email || !username || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if another user already exists with the same email
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== req.params.id) {
      return res
        .status(409)
        .json({ message: "Email already in use by another user" });
    }

    // Update the user with the new data
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, // Assume user ID is passed as a URL parameter
      { email, username, role },
      { new: true, runValidators: true } // `new: true` returns the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the user" });
  }
};

module.exports = {
  getUsers,
  deleteUser,
  createUser,
  updateUser,
};
