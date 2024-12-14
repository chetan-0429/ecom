const Shipping = require('../models/shippingModel');

async function addShipping(req, res, next) {
    if (!req.user) {
      return res.json({ success: false });
    }
  
    const { userId } = req.user;
    const { address, city, state, country, pinCode, phoneNo } = req.body;
    
    try {
      let newAddress = null;
      const shipping = await Shipping.findOne({ userId });
  
      if (!shipping) {
        const newShipping = new Shipping({
          userId,
          shippingInfo: [
            { address, city, state, country, pinCode, phoneNo },
          ],
        });
  
        await newShipping.save();
  
        newAddress = newShipping.shippingInfo[0];
      } else {
        shipping.shippingInfo.push({ address, city, state, country, pinCode, phoneNo });
        await shipping.save();
  
        newAddress = shipping.shippingInfo[shipping.shippingInfo.length - 1];
      }
  
      return res.status(201).json({
        success: true,
        newAddress,
        message: "Shipping address added successfully",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "An error occurred",
        error: err.message,
      });
    }
  }
  

async function getAddress(req,res,next) {
    if(!req.user) {return res.json({success:false})};
    const {userId} = req.user;

    try{

         const shipping = await Shipping.findOne({userId});
   if(!shipping){
       return res.status(201).json({success:false,message:'no address is saved'});
   }
    else{
    
    return res.status(201).json({success:true,shippingInfo:shipping.shippingInfo,shippingId:shipping._id});
    }
       
    }catch(err){
        return res.status(500).json({ success: false, message: "An error occurred", error: err.message });

    }
}

module.exports = {addShipping,getAddress};
