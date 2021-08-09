const { DataTypes } = require("sequelize");

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
    activity_id: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "activity_id",
      references: {
        key: "id",
        model: "activity_info_model",
      },
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
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "name",
    },
    phone: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "phone",
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "email",
    },
    member_id: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "member_id",
    },
    remit: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "remit",
    },
    order_state: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "order_state",
    },
  };
  const options = {
    tableName: "activity_order",
    comment: "",
    timestamps: false,
    indexes: [
      {
        name: "activity_id",
        unique: false,
        type: "BTREE",
        fields: ["activity_id"],
      },
    ]
  };
  const ActivityOrderModel = sequelize.define(
    "activity_order_model",
    attributes,
    options
  );
  return ActivityOrderModel;
};
