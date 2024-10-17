const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
      },
    shippingInfo:[
        {
      address: {
        type: String,
        required: false,
      },
      city: {
        type: String,
        required: false,
      },
      state: {
        type: String,
        required: false,
      },
      country: {
        type: String,
        required: false,
      },
      pinCode: {
        type: Number,
        required: false,
      },
      phoneNo: {
        type: Number,
        required: false,
      }
    }
    ]
})

const shippingModel =  mongoose.model('Shipping',shippingSchema);
module.exports = shippingModel;