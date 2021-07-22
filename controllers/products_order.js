const { reduce } = require('bluebird');
const db = require('../models');
const ShoppingCartItems =db.shoppingCartItemsModel;
const Products = db.ProductsModel;
const OrderDetail = db.OrderedDetailModel;
const OrderItems = db.OrderItemsModel;

exports.getOrderItems = async (req, res, next) => {
    try {
        ShoppingCartItems.belongsTo(Products, { targetKey: 'id', foreignKey: 'product_id'});
        const getShoppingCartItems = await ShoppingCartItems.findAll({ 
            attributes: ['buy_num'],
            include:[{
                model: Products,
                attributes: ['name', 'price', 'reserved'],
            }],
            where: {
                member_id: req.member.id
            }
        })
        
        res.status(200).json(getShoppingCartItems)

    } catch(err) {
        next(err)
    }
}



//order detail
exports.postOrderDetails = async (req, res, next) => {
    try {
        ShoppingCartItems.belongsTo(Products, { targetKey: 'id', foreignKey: 'product_id'});
        const getShoppingCartItems = await ShoppingCartItems.findAll({ 
            attributes: ['buy_num', 'product_id'],
            include:[{
                model: Products,
                attributes: ['name', 'price'],
            }],
            where: {
                member_id: req.member.id
            }
        })
        //discount amount
        let original_total = 0 
        const discount = req.body.order_details.discount_count * 100;
        for(i = 0;i < getShoppingCartItems.length;i++) {
            original_total += getShoppingCartItems[i].products_model.price
        }
        let pay_total = original_total - discount;
        //---------

        //----res
        const resToOrderDetail = {
            name: req.member.name,
            original_total,
            discount_count: req.body.order_details.discount_count,
            pay_total,
            pay_way: req.body.order_details.pay_way,
            city: req.body.order_details.city,
            postal: req.body.order_details.postal,
            address: req.body.order_details.address,
            buyItem: getShoppingCartItems
        }
        //save db
        let orderId = await OrderItems.max('order_id')
        let order_serial_number = `RK0001${orderId}`
        const saveOrderDetail = await OrderDetail.create({
            order_serial_number,
            member_id: req.member.id,
            original_total,
            discount_count: req.body.order_details.discount_count,
            pay_total,
            pay_way: req.body.order_details.pay_way,
            city: req.body.order_details.city,
            postal: req.body.order_details.postal,
            address: req.body.order_details.address,
        })
        let orderItemsArr = []
        for(let i = 0;i < getShoppingCartItems.length; i++) {
            getShoppingCartItems[i].dataValues.order_id = orderId + 1;
            delete getShoppingCartItems[i].dataValues.products_model;
            orderItemsArr.push(getShoppingCartItems[i].dataValues)
        }
        console.log(orderItemsArr)
             
        const saveOrderItems = await OrderItems.bulkCreate(orderItemsArr)
        //------------

        
        res.status(200).json(resToOrderDetail)
    } catch(err) {
        next(err)
    }
}