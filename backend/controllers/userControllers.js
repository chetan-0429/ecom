const User = require('../models/userModel');

async function createUser(req,res,next) {
    const {email,password} = req.body;
    try{
    const user = new User({
        email,
        password
    })
    const savedUser = await user.save();
    // console.log('savedUser: ',savedUser._id)
    res.status(200).json({success:true,user:savedUser});
    }catch(err){
        res.status(400).json({success:false,message:err.message});
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
    req.session.user = {email,userId:user._id};
    // console.log('req.session.user: ',req.session.user);
    res.status(200).json({success:true,user:req.session.user});
}
   catch(err){
    res.status(400).json({success:false,message:err.message});
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


// async function logout(req,res,next) {
//     console.log('loggout called')
//     if(req.session){
//         console.log('loggout session')
//         req.session.destroy();
//         res.status(200).json({success:true,message:'session destroy'});
//     }
//     else{
//         res.status(400).json({success:false,message:err.message});
//     }
// }

async function checkForSession(req,res,next){
    if(req.session && req.session.user){
     res.status(200).json({ loggedIn: true, user: req.session.user });
    } 
    else {
        res.status(200).json({ loggedIn: false });
    }
}


module.exports = {createUser,getUser,login,logout,checkForSession};