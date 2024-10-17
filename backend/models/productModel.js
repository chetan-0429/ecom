const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    quantity:Number,
    imageUrl:String,
    category:String,
    company:String,
    stock:{
      type:Number,
      default:0,
    },
    ratings: {
        type: Number,
        default: 0,
      },
    numOfReviews: {
        type: Number,
        default: 0,
      },
      reviews: [
        {
          user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
          },
          name: {
            type: String,
            required: false,
          },
          rating: {
            type: Number,
            required: false,
          },
          comment: {
            type: String,
            required: false,
          },
        },
      ],    
    createdAt: {
        type: Date,
        default: Date.now,
      },

})

const productModel = mongoose.model('Products',ProductSchema);
module.exports = productModel;