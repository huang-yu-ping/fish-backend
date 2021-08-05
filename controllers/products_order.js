const db = require('../models');
const ShoppingCartItems =db.shoppingCartItemsModel;
const Products = db.ProductsModel;
const OrderDetail = db.OrderedDetailModel;
const OrderItems = db.OrderItemsModel;
//random number
const rn = require('random-number');
let gen = rn.generator({
    min:  1000, 
    max:  9999, 
    integer: true
})
//send email
const sendEmail = require('../utils/email')

exports.getOrderItems = async (req, res, next) => {
    try {
        //check cart is not empty
        const retNum = await ShoppingCartItems.findAll({ where: {
            member_id: req.member.id
          }
        })
        const selectedNum = retNum.length;
        if(selectedNum === 0) {
            res.status(406).json({
                message: "請選擇商品加入購物車"
            })
            return;
        }
        //---------------------------------------------
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
        
        res.status(201).json(getShoppingCartItems)

    } catch(err) {
        next(err)
    }
}



//order detail
exports.postOrderDetails = async (req, res, next) => {
    try {
       // check cart is not empty
        const retNum = await ShoppingCartItems.findAll({ where: {
            member_id: req.member.id
          }
        })
        const selectedNum = retNum.length;
        if(selectedNum === 0) {
            res.status(406).json({
                message: "請選擇商品加入購物車"
            })
            return;
        }
        //--------------------------------------------

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
            original_total += getShoppingCartItems[i].products_model.price * getShoppingCartItems[i].buy_num
        }
        let pay_total = original_total - discount;
        //---------

        //----res save order
        // const resToOrderDetail = {
        //     name: req.member.name,
        //     original_total,
        //     discount_count: req.body.order_details.discount_count,
        //     pay_total,
        //     pay_way: req.body.order_details.pay_way,
        //     deliver_way: req.body.order_details.deliver_way,
        //     city: req.body.order_details.city,
        //     postal: req.body.order_details.postal,
        //     address: req.body.order_details.address,
        //     buyItem: getShoppingCartItems
        // }
        //here, we need to confirm shopping cart is not empty
        //save db
        let orderId = await OrderItems.max('order_id')
        let order_serial_number = `RK${gen()}${orderId}`
        const saveOrderDetail = await OrderDetail.create({
            order_serial_number,
            member_id: req.member.id,
            original_total,
            discount_count: req.body.order_details.discount_count,
            pay_total,
            pay_way: req.body.order_details.pay_way,
            deliver_way: req.body.order_details.deliver_way,
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
        

        //clear cart items and diff reserved
             
        const saveOrderItems = await OrderItems.bulkCreate(orderItemsArr)
        
        saveOrderItems.map(async (item) => {
            await Products.decrement({'reserved': item.buy_num}, {where: {
                id: item.product_id
            }})
            
        })
        
        //clear cart items
        const clearCartItems = await ShoppingCartItems.destroy({ where: {
            member_id: req.member.id
        }})

        console.log(saveOrderDetail)
        sendEmail.sendEmail(saveOrderDetail.order_serial_number)
        res.status(200).json({
            saveOrderDetail,
            buyItem: getShoppingCartItems
        })
        //res.status(200).json(saveOrderItems)
    } catch(err) {
        next(err)
    }
}



exports.showOrderDetail = async (req, res, next) => {
    try {
        const orderId = req.params.id
        OrderDetail.belongsTo(OrderItems, {
            targetKey: "order_id",
            foreignKey: "id",
          });
        const myOrderDetail = await OrderDetail.findAll({
            include: [
              {
                model: OrderItems,
                attributes: ["product_id", "buy_num"],
              },
            ],
            where: {
              id: orderId
            }
        });

        res.status(200).json({
            myOrderDetail
        })
    } catch(err) {
        next(err)
    }
}