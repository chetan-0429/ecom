
async function authentication(req,res,next){
    if(req.session && req.session.user){
        next();
    }
    else{
          res.status(401).json({message:'login plz'})
    }
}

module.exports = {authentication};