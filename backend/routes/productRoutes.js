const {addProduct, getAllProducts, singleProduct, cartProducts, createProductReview, abc, getProductReview, updateProduct, deleteProduct} = require('../controllers/productControllers')
const express = require('express');
const { authentication } = require('../middleware/auth');
const router = express.Router();

// app.use('/api/v1/products/',productRouter);
// app.use('/api/v1/users/',userRouter);
// app.use('/api/v1/cart/',cartRouter);
// app.use('/api/v1/shipping/',shippingRouter);
// app.use('/api/v1/order/',orderRouter);

router.post('/add',addProduct);
router.get('/products',getAllProducts);
router.get('/product/:id',singleProduct);
router.post('/bulk',cartProducts);
router.post('/review',createProductReview);
router.get('/get_review',getProductReview);
router.post('/update',updateProduct);
router.get('/delete/:id',deleteProduct);

module.exports = router;