const express = require('express');
const { addToCart, countCartItems, cartItems, toatalCartItems, removeFromCart, quantityDecrease } = require('../controllers/cartControllers');
const router = express.Router();


router.post('/add',addToCart);
router.get('/count',countCartItems);
router.get('/cart',cartItems);
router.get('/products',toatalCartItems);
router.get('/remove/:id',removeFromCart);
router.get('/quantitydec/:id',quantityDecrease);
module.exports = router;