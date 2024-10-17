const mongoose = require('mongoose');
let uri = process.env.DB_URI

async function connectDb(){
    try{
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
        }
        catch(err){
            console.log(err.message);
        }
}

module.exports = connectDb;