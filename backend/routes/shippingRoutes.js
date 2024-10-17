const express = require('express');
const { addShipping, getAddress } = require('../controllers/shippingControllers');
const router = express.Router();

router.post('/add',addShipping);
router.get('/address',getAddress);

module.exports = router;