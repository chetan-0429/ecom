const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken')

//payload is like user
function createToken(payload){  
    const token = jwt.sign(payload, process.env.SECRET_KEY,{expiresIn:'5h'})
    return token;
}

function verifyToken(token){
    return jwt.verify(token,process.env.SECRET_KEY);
}

module.exports = {createToken,verifyToken}