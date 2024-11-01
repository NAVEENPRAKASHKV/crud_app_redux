const User = require("../model/userModel")
const jwt = require("jsonwebtoken")

const generateToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"30d"})
}
const loginUser=async(req,res)=>{
    try{
        const { email, password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.json({message:"no user exists"})
        }
        
        if (user && await user.matchPassword(password)) {
            res.json({ 
                username:user.username,
                _id:user._id,
                token:generateToken(user._id),
                email: user.email,
             });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({ message: "Error in login  of user" , error: error.message});
    }
}
const registerUser = async (req, res) => {
    try {
      const { email, password, phoneNumber, username } = req.body;

      // Check if all fields are provided
      if (!email || !password || !phoneNumber || !username) {
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
        phoneNumber,
        username
      });
  
      await newUser.save();
  
      // Respond with success message and appropriate status
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error in registration of user:", error);
      res.status(500).json({ message: "Error in registration of user" , error: error.message });
    }
  };
const getUserProfile =async(req,res)=>{
    try{
        console.log("user",req.user)
        if(req.user){
            const user= await User.findById(req.user._id);
            res.json({
                 _id:req.user._id,
                 username:req.user.username,
                 email:req.user.email,
                 phoneNumber:req.user.phoneNumber
                })
        }else{
                res.status(404).json({ message: "User not found" });
        }
    }
    catch(error){
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = {loginUser,registerUser,getUserProfile}