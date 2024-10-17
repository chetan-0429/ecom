const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingAddress: {
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
  },

  orderItems: [
    {
      name: {
        type: String,
        required: false,
      },
      price: {
        type: Number,
        required: false,
      },
      quantity: {
        type: Number,
        required: false,
      },
      image: {
        type: String,
        required: false,
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: false,
      },
      status:{
        type:String,
        required:false,
        default:"processing"
      }
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  paymentInfo: {
    id: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
  },
  paidAt: {
    type: Date,
    required: false,
  },
  itemsPrice: {
    type: Number,
    required: false,
    default: 0,
  },
  taxPrice: {
    type: Number,
    required: false,
    default: 0,
  },
  shippingPrice: {
    type: Number,
    required: false,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: false,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: false,
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;