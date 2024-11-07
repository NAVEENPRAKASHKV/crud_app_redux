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
const editUser = async (req, res) => {
  try {
    const { username, email, password, _id } = req.body;
    console.log(req.body);
    // Check for required fields
    if (!_id) {
      return res
        .status(400)
        .json({ success: false, message: "user id not found" });
    }
    // Find the user by email
    const user = await User.findOne({ _id });
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
    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({
      success: false,
      message: "Profile update failed",
      error: error.message,
    });
  }
};

module.exports = {
  getUsers,
  deleteUser,
  createUser,
  editUser: [upload.single("profileImage"), editUser],
};
