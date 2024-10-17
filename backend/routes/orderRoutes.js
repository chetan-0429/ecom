const express = require('express');
const { addOrder, getOrder, getAllOrder, updateOrder } = require('../controllers/orderControllers');
const { updateOne } = require('../models/productModel');
const router = express.Router();


router.get('/',getOrder);
router.get('/order_list',getAllOrder);
router.post('/update',updateOrder);

module.exports = router;