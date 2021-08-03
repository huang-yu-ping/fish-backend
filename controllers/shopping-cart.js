//shopping cart db
const db = require('../models');
const ShoppingCartItems =db.shoppingCartItemsModel;
const Products = db.ProductsModel;

//get cart list count
//當用戶登入時要顯示於shopping cart count
exports.postCartAdd = async (req, res, next) => {
    try {
        const retNum = await ShoppingCartItems.findAll({ where: {
            member_id: req.member.id
          }
        })
        //const selectedNum = retNum.length;
        res.status(200).json({
            cart_list: retNum
        })
    } catch(err) {
        next(err)
    }
}

//get cart list
exports.postCartList = async (req, res, next) => {
    try {
        // first time ?
        //找到shopping cart有沒有登入會員的加入
        let findMemberItemCart = await ShoppingCartItems.findAll({
            where: {
                member_id: req.member.id
            }
        })
       //如果這個人沒有
       // we need to comfirm is not empty array
        if(findMemberItemCart.length === 0) {
            
            //----------------
            //當他選擇商品加入購物車
            let arrItems = req.body.products
            for(let i = 0;i < arrItems.length; i++) {
                let res = arrItems[i].member_id = req.member.id
            }
            //create
            //加入shopping cart表
            const createMemberItemCart = await ShoppingCartItems.bulkCreate(arrItems)
            if(createMemberItemCart.length === 0) {
                return res.status(406).json({
                    message: "購物車添加失敗",
                }) 
            }
            return res.status(201).json({
                message: "購物車添加成功",
                createMemberItemCart
            }) 
        } else {
            //clear
            const deleteMemberItemCart = await ShoppingCartItems.destroy({
                where: {
                    member_id: req.member.id
                }
            })
            
            //update
            let arrItems = req.body.products
            for(let i = 0;i < arrItems.length; i++) {
                let res = arrItems[i].member_id = req.member.id
            }
            const updateMemberItemCart = await ShoppingCartItems.bulkCreate(arrItems, { 
                updateOnDuplicate: ["member_id", "product_id", "buy_num"] })
            
            if(updateMemberItemCart.length === 0) {
                return res.status(406).json({
                    message: "購物車添加失敗",
                }) 
            }
            //const updateItemCart = await OrderItems.bulkCreate(updateMemberItemCart)
            //join
            ShoppingCartItems.belongsTo(Products, { targetKey: 'id', foreignKey: 'product_id'});
       
            let findMemberItemCart = await ShoppingCartItems.findAll({
                include:[{
                    model: Products,
                    attributes: ['name', 'price', 'reserved'],
                }],
                where: {
                    member_id: req.member.id
                }
            })


            return res.status(201).json({
                message: "購物車添加成功",
                findMemberItemCart
            })  
        }

              

    } catch(err) {
        next(err)
    }
}


exports.deleteCartList = async (req, res, next) => {
    try {
        //clear
        const deleteMemberItemCart = await ShoppingCartItems.destroy({
            where: {
                member_id: req.member.id
            }
        })
        res.status(204).json({
            message: "購物車清除成功"
        })
    } catch(err) {
        next(err)
    }

}









