const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
      },
      products: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
          },
          quantity: Number
        }
      ]
});
const cartModel = mongoose.model('Cart',cartSchema);

module.exports = cartModel;