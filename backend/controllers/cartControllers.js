const Cart = require('../models/cartModel');

async function cartItems(req,res,next){
    if(!req.user) return res.status(200).json({status:false,message:'login to see cart'});
    const {userId} = req.user;
    try{
        const cart = await Cart.findOne({userId});
        if(cart){
            res.status(200).json({status:true,message:'cart items',products:cart.products});
        }
        else{
            res.status(200).json({status:false,message:'cart is empty'});
        }
    }catch(err){
        res.status(200).json({ success: false, message: err });
    }
}

async function addToCart(req,res,next) {
const { productId, quantity} = req.body;
if(!req.user) return res.status(400).json({status:false,message:'login plz'});
const {userId} = req.user;
    try{
        const cart = await Cart.findOne({ userId });
        if(cart) {
        const productIndex = cart.products.findIndex((product) => product.productId.equals(productId));
            
            if (productIndex !== -1) {
                    cart.products[productIndex].quantity += Number(quantity);
            } else {
                cart.products.push({ productId, quantity });
            }
            
            await cart.save();
        } else {
            const newCart = new Cart({
                userId,
                products: [{ productId, quantity }]
            });
            
            await newCart.save();
        }
        res.status(200).json({ success: true, message: 'added to cart' });

        }catch(err){
            res.status(200).json({ success: false, message: err });
        }
    }

    async function countCartItems(req,res,next){
       
        if(!req.user) return res.status(200).json({status:true, productCount:0});
      
        try{
            const {userId} = req.user;
            const cart = await Cart.findOne({ userId });

            if(!cart) {
                return res.status(200).json({status:true,productCount:0})
            }
            const productLength = cart.products.length;
            return res.status(200).json({status:true,productCount:productLength})

        }catch(err){
            return res.status(400).json({status:false, productCount:0});
        }
    }
    async function toatalCartItems(req,res,next){

        if(!req.user) return res.status(200).json({status:true,products:[],productCount:0,message:'login please'});

        try{
            const {userId} = req.user;
            const cart = await Cart.findOne({ userId });
            if(!cart) {
                return res.status(200).json({status:true,productCount:0,products:[]})
            }
            const productLength = cart.products.length;
            const products = cart.products.map((pro)=>{return {productId: pro.productId,quantity:pro.quantity}});
            return res.status(200).json({status:true,productCount:productLength,products:products})

        }catch(err){
            return res.status(400).json({status:false, productCount:0});
       
        }
    }


    //remove from cart:
    async function removeFromCart(req,res,next){
        if(!req.user){
            return res.json({staus:false,message:'login please'});
        }
        const productId = req.params.id;
        const {userId} = req.user;
        try {
            const cart =await Cart.findOne({userId});
            if(!cart){
                return res.json({staus:true,message:'No Cart'});
            }
           const result = await cart.updateOne( { $pull: { products: { productId } } })
            if (result.modifiedCount === 0) {
                return res.status(404).json({ message: 'Product not found in cart' });
            }
    
            res.status(200).json({ message: 'Product removed from cart' });
        } catch (error) {
            res.status(500).json({ message: 'Error removing product from cart', error });
        }
    }

    //decrease quantity
    async function quantityDecrease(req,res,next){
        if(!req.user){
            return res.json({staus:false,message:'login please'});
        }
        const productId = req.params.id;
        const {userId} = req.user;
        try {
            const cart =await Cart.findOne({userId});
            if(!cart){
                return res.json({staus:true,message:'No Cart'});
            }
            const productIndex = cart.products.findIndex((product) => product.productId.equals(productId));
            if (productIndex !== -1) {
                    cart.products[productIndex].quantity -= 1;
            } 
            await cart.save();
            res.status(200).json({ message: 'Product decrease from cart' });
        } catch (error) {
            res.status(500).json({ message: 'Error in decreaseing product from cart', error });
        }
    }

    //clear cart
    async function clearCart(req,res){
        if(!req.user){
            return res.json({status:false,message:'login please'});
        }
        const {userId} = req.user;
        try{
           const result = await Cart.deleteMany({userId});
           res.json({success:true,message:'removed successfully'})
        }catch(err){
            res.json({success:false,message:'removed successfully'})
        }
    }

    module.exports = {addToCart,countCartItems,cartItems,toatalCartItems,removeFromCart,quantityDecrease,clearCart};