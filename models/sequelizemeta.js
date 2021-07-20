const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "name",
      unique: "name"
    }
  };
  const options = {
    tableName: "sequelizemeta",
    comment: "",
    indexes: []
  };
  const SequelizemetaModel = sequelize.define("sequelizemeta_model", attributes, options);
  return SequelizemetaModel;
};