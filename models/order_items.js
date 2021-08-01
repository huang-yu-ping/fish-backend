const { DataTypes } = require("sequelize");
const moment = require("moment");

module.exports = (sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id",
    },
    order_id: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      defaultValue: 1,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "order_id",
      references: {
        key: "id",
        model: "order_detail_model",
      },
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
        model: "products_model",
      },
    },
    buy_num: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "buy_num",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn("current_timestamp"),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "created_at",
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn("current_timestamp"),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "updated_at",
    },
  };
  const options = {
    tableName: "order_items",
    comment: "",
    indexes: [
      {
        name: "order_id",
        unique: false,
        type: "BTREE",
        fields: ["order_id"],
      },
      {
        name: "product_id",
        unique: false,
        type: "BTREE",
        fields: ["product_id"],
      },
    ],
    timestamps: false,
  };
  const OrderItemsModel = sequelize.define(
    "order_items_model",
    attributes,
    options
  );
  return OrderItemsModel;
};
