const db = require('../models');
const Product = db.products;


//login
exports.getProduct = async (req, res, next) => {
    try{
        Product.findAll(
        //     {
        //     where: {
        //       firstName: 'Apple'
        //     }
        //   }
          ).then( data => {
            console.log(data);
            res.json(data);
          });
    }catch
    {

    }
}
exports.getProductByName = async (req, res, next) => {
    try{
        Product.findAll(
            {
            where: {
              name:req.params.name
            }
          }
          ).then( data => {
            
            res.json(data);
          });
    }catch
    {
        res.json({err:"fail"});
    }
}

