const express = require('express');
const router = express.Router();
//auth
const auth = require('../middleware/auth');
//controller
const orderProductsCtrl = require('../controllers/products_order');

//get order product list
router.get('/products', auth, orderProductsCtrl.getOrderItems)

//order detail
router.post('/products', auth, orderProductsCtrl.postOrderDetails)



module.exports = router;