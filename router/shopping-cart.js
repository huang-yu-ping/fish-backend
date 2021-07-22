const express = require('express');
const router = express.Router();
//ctrl
const shppingCartCtrl = require('../controllers/shopping-cart');
//auth
const auth = require('../middleware/auth');
//validadtor
const memberValidator = require('../validator/products-order');
//click shopping cart
router.post('/', auth, shppingCartCtrl.postCartAdd)

//get cart item list
router.get('/', auth, memberValidator.postOrderDetail, shppingCartCtrl.getCartList)


module.exports = router;