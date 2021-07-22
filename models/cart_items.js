const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id"
    },
    member_id: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "member_id",
      references: {
        key: "id",
        model: "members_model"
      }
    },
    product_id: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "product_id",
      references: {
        key: "id",
        model: "products_model"
      }
    },
    buy_num: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "buy_num"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp'),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "created_at"
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp'),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "updated_at"
    }
  };
  const options = {
    tableName: "cart_items",
    comment: "",
    indexes: [{
      name: "product_id",
      unique: false,
      type: "BTREE",
      fields: ["product_id"]
    }, {
      name: "member_id",
      unique: false,
      type: "BTREE",
      fields: ["member_id"]
    }],
    timestamps: false
  };
  const CartItemsModel = sequelize.define("cart_items_model", attributes, options);
  return CartItemsModel;
};