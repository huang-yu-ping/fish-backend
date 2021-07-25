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
    activity_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "activity_name",
    },
    place: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "place",
    },
    schedule: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "schedule",
    },
    start_time: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "start_time",
    },
    apply: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "apply",
    },
    cost_adult: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "cost_adult",
    },
    cost_children: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "cost_children",
    },
    limit_num: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      defaultValue: "20",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "limit_num",
    },
    current_apply: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "current_apply",
    },
  };
  const options = {
    tableName: "activity_info",
    comment: "",
    indexes: [],
    timestamps: false,

  };
  const ActivityInfoModel = sequelize.define(
    "activity_info_model",
    attributes,
    options
  );
  return ActivityInfoModel;
};
