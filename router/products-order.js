const express = require('express');
const router = express.Router();
//auth
const auth = require('../middleware/auth');
//controller
const orderProductsCtrl = require('../controllers/products_order');
//validadtor
const memberValidator = require('../validator/products-order');

//get order product list
router.get('/products', auth, orderProductsCtrl.getOrderItems)

//order detail
router.post('/products', auth, memberValidator.postOrderDetail, orderProductsCtrl.postOrderDetails)
//------------------------------------------------------------
// const db = require('../models');
// const ShoppingCartItems =db.shoppingCartItemsModel;
// const Products = db.ProductsModel;
// const OrderDetail = db.OrderedDetailModel;
// const OrderItems = db.OrderItemsModel;

//test
// router.get('/test', async (req, res) => {
//     let arr = [];
//     let diff = [1,2,3]
//     for(let i = 1;i<4;i++) {
//         arr.push(i)
//     }
//     Products.findAll({
//         where: { id: arr },
//         attributes: ['reserved']
//     }).then((res) => {
//         for(let i = 0;i < res.length; i++) {
//             res[0].dataValues.set({reserved: 2})
//         }
//     })
    
//     res.json(123)

// })

module.exports = router;