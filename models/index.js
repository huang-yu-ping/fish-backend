"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
//members
db.membersModel = require("./members")(sequelize);
//activity
db.activityInfoModel = require("./activity_info")(sequelize);
db.activityOrderModel = require("./activity_order")(sequelize);
/* note */
db.noteModel = require("./note")(sequelize);
/* board */
db.boardModel = require("./board")(sequelize);
//profiles
db.noteModel = require("./note")(sequelize);
db.memberLikeProductsModel = require("./member_like_products")(sequelize);
db.favoritesNoteModel = require("./favorites_note")(sequelize);
//shopping cart
db.shoppingCartItemsModel = require("./cart_items")(sequelize);
//products
db.ProductsModel = require("./products")(sequelize);
//order products
db.OrderItemsModel = require("./order_items")(sequelize);
//order detail
db.OrderedDetailModel = require("./order_detail")(sequelize);

module.exports = db;
