const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    avatar: String,
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cart'
    }
});

const userModel = new mongoose.model('Users',userSchema);
module.exports = userModel;