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
        model: "members_model",
      },
    },
    note_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "note_name",
    },
    note_content: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "note_content",
    },
    note_update_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn("current_timestamp"),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "note_update_time",
    },
    favorite: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "favorite",
    },
    state: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: "1",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "state",
    },
  };
  const options = {
    tableName: "note",
    comment: "",
    timestamps: false,
    indexes: [
      // {
      //   name: "board_id",
      //   unique: false,
      //   type: "BTREE",
      //   fields: ["board_id"],
      // },
      {
        name: "member_id",
        unique: false,
        type: "BTREE",
        fields: ["member_id"],
      },
    ],
  };
  const NoteModel = sequelize.define("note_model", attributes, options);
  return NoteModel;
};
