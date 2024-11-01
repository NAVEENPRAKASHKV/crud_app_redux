const jwt = require("jsonwebtoken")
const User = require("../model/userModel")


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
  };
  
  const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});
      if (user && (await user.matchPassword(password)) && user.isAdmin) {
        console.log("after password comparison",user)
        res.json({
          _id: user._id,
          username: user.username,
          email: user.email,
          token: generateToken(user._id)
        });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
const getUsers =async(res,req)=>{
  try{
    const users= await User.find({isActive:false})
    res.json(users) 
  }
  catch(error){
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

module.exports ={loginAdmin,getUsers}