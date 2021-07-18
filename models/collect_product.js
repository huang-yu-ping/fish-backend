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
    collect_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp'),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "collect_date"
    }
  };
  const options = {
    tableName: "collect_product",
    comment: "",
    indexes: [{
      name: "member_id",
      unique: false,
      type: "BTREE",
      fields: ["member_id"]
    }, {
      name: "product_id",
      unique: false,
      type: "BTREE",
      fields: ["product_id"]
    }]
  };
  const CollectProductModel = sequelize.define("collect_product_model", attributes, options);
  return CollectProductModel;
};