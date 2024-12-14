const Order = require('../models/orderModel')
const User = require('../models/userModel')

//admin
// async function getAllOrder(req,res,next){
//     try{
//         console.log('order called')
//         const orders = await Order.find({}).sort({ createdAt: -1 }) //.populate('userId', 'name email');
//        res.status(201).json({orders,sucess:true});
//     }catch(err){
//         console.log('error in getting')
//         return res.status(500).json({ success: false, message: "An error occurred in getting order", error: err.message });
//     }
// }
async function getAllOrder(req,res,next){
    try{
        if(!req.user) {return res.status(401).json({success:false})};
        const orders = await Order.find({}).sort({ createdAt: -1 }) //.populate('userId', 'name email');
        const ordersWithUserDetails = await Promise.all(
            orders.map(async (order) => {
                const user = await User.findById(order.userId);
                return {
                    ...order.toObject(),
                    user: {
                        name: user?.name || 'Unknown',
                        email: user?.email || 'Unknown',
                    },
                };
            })
        );
        
        res.status(201).json({orders:ordersWithUserDetails,sucess:true});
    }catch(err){
        // console.log('error in getting')
        return res.status(500).json({ success: false, message: "An error occurred in getting order", error: err.message });
    }
}
async function updateOrder(req,res,next){
    const {orderId,itemId,status} = req.body;
    try{
       const order = await Order.findOne({_id:orderId});
       const item = order.orderItems.find((item)=> item._id == itemId)
       item.status = status;
       await order.save();
       res.status(201).json({sucess:true});

    }catch(err){
        return res.status(500).json({ success: false, message: "An error occurred in getting order", error: err.message });
    }
}
async function updateOrder(req, res, next) {
  const { orderId, itemId, status } = req.body;
  
  try {
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const item = order.orderItems.find((item) => item._id.toString() === itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found in order" });
    }

    item.status = status;

    await order.save();

    res.status(200).json({ success: true, message: "Order item updated successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "An error occurred in updating the order", error: err.message });
  }
}

//users
async function getOrder(req,res,next){
    if(!req.user) {return res.json({success:false})};
    const {userId} = req.user;
      try{
        const savedOrder = await Order.find({userId});
        const orderDetails = [];
        savedOrder.forEach(order => {
            orderDetails.push({
                shippingAddress:order.shippingAddress,
                id: order._id,
                orderItems: order.orderItems,
                paymentInfo: order.paymentInfo,
                itemsPrice: order.itemsPrice,
                totalPrice: order.totalPrice,
                taxPrice: order.taxPrice,
                shippingPrice: order.shippingPrice,
                orderStatus: order.orderStatus,
        })
      })
      res.json({success:true,orderDetails})
    }catch(err){
        return res.status(500).json({ success: false, message: "An error occurred in getting order", error: err.message });

    }
}

async function addOrder(req,res,next){
    if(!req.user) {return res.json({success:false})};
    const {userId} = req.user;
    const {shippingInfo , addressId, orderItems,paymentInfo,itemsPrice,taxPrice, shippingPrice,totalPrice,} = req.body;
    try{
        const paidAt = new Date();
        const order = new Order({
            shippingInfo,
            addressId,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            userId,
            paidAt,
            });
        const savedOrder = await order.save();
        
        return res.status(201).json({ success: true,savedOrder});

    }catch(err){
        return res.status(500).json({ success: false, message: "An error occurred", error: err.message });

    }
}


module.exports = {addOrder,getOrder,getAllOrder,updateOrder};