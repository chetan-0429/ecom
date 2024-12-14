const { createToken ,verifyToken} = require('../config/jwt');
const User = require('../models/userModel');

async function createUser(req,res,next) {
    const {email,password} = req.body;
    try{
     const isUser = await User.findOne({email})
     if(isUser){
        return res.status(409).json({success:false,message:'user already exist'})
     }
    const newUser = new User({
        email,
        password
    })
    const user = await newUser.save();
    if(!user){
        return res.status(401).json({ success: false, message: "error in creating user"});
    }
    const token = createToken({userId:user._id,email:user.email});
    res.status(201).json({success:true,token});

    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
}

async function getUser(req,res,next) {
    try{
        res.json('got')
    }catch(err){
        res.status(400).json({success:false,message:err.message});
    }
}

async function login(req,res,next){
    const {email,password} = req.body;
    try{
    const user = await User.findOne({email,password});
    if(!user) {
        return res.status(401).json({ success: false, message: "Invalid email or password"});
    }
    const token = createToken({userId:user._id,email:user.email});
    res.status(201).json({success:true,token,user:{email:user.email}});
    }
   catch(err){
    res.status(500).json({success:false,message:err.message});
    }
}

async function logout(req, res, next) {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ success: false, message: "Failed to destroy session" });
            }
            res.status(200).json({ success: true, message: 'Session destroyed' });
        });
    } else {
        res.status(400).json({ success: false, message: "No active session to destroy" });
    }
}




async function checkForSession(req,res,next){
    if(req.session && req.session.user){
     res.status(200).json({ loggedIn: true, user: req.session.user });
    } 
    else {
        res.status(200).json({ loggedIn: false });
    }
}


module.exports = {createUser,getUser,login,logout,checkForSession};