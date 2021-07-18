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
    catalog: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "catalog"
    }
  };
  const options = {
    tableName: "catalog",
    comment: "",
    indexes: []
  };
  const CatalogModel = sequelize.define("catalog_model", attributes, options);
  return CatalogModel;
};