const User = require("../models/userModel") 
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

require('dotenv').config()

exports.register = async (req,res) =>{
   try{
    const {username, email, password} = req.body;
    const checkUsername = await User.findOne({username})
    if(checkUsername){
        res.json({msg:"Username is already taken", status: false})
    }
    const checkEmail = await User.findOne({email})
    if(checkEmail){
        res.json({msg:"Email already exists", status: false})
    }
    const hashed = await bcrypt.hash(password, 10);
    console.log("hashed", hashed)

    const newUser = new User();
    newUser.username = username
    newUser.email = email
    newUser.password = hashed
    console.log("newUser", newUser)
    const user = await newUser.save();
    const token = jwt.sign(req.body, "jwtSecret", {expiresIn: 300})
 
    if (user){
        res.send({user, status: true, token:token })
    }
   }catch(err){
       console.log("error in creating user")
   }
}


exports.login = async (req,res) =>{
try{
    const {username, password} = req.body;
    const user = await User.findOne({username})
    if(!user){
        res.json({msg:"Invalid username or password", status: false})
    }
    const matchPassword = await bcrypt.compare(password , user.password)
    console.log("match password", matchPassword)
    if(!matchPassword){
        res.json({msg:"Invalid username or password", status: false})
    }
    const token = jwt.sign(req.body, "jwtSecret", {expiresIn: 300})
    if (user){
        delete user.password;
        res.send({user, status: true, token:token })
    }
}catch(err){
    console.log("error in signin in user")
}
}

module.exports.getContacts = async (req, res, next) => {
    try {
        // console.log("req.param", req.params)
    //   if(req.params._id !== ""){
        const users = await User.find({ _id: { $ne: req.params._id } }).select([
            "email",
            "username",
            "_id",
          ]);
          return res.json(users);
    //   }
    } catch (ex) {
      next(ex);
    }
  };