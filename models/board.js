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
    note_id: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "note_id",
      references: {
        key: "id",
        model: "note_model",
      },
    },
    board_usename: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "board_usename",
    },
    board_content: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "board_content",
    },
    board_update_time: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: sequelize.fn("current_timestamp"),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "board_update_time",
    },
    board_state: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: "1",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "board_state",
    },
  };
  const options = {
    tableName: "board",
    comment: "",
    timestamps: false,
    indexes: [
      {
        name: "note_id",
        unique: false,
        type: "BTREE",
        fields: ["note_id"],
      },
    ],
  };
  const BoardModel = sequelize.define("board_model", attributes, options);
  return BoardModel;
};
