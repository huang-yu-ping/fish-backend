const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    favorites_note_id: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "favorites_note_id",
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
    collect_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn("current_timestamp"),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "collect_date",
    },
  };
  const options = {
    tableName: "favorites_note",
    comment: "",
    timestamps: false,
    indexes: [
      {
        name: "member_id",
        unique: false,
        type: "BTREE",
        fields: ["member_id"],
      },
      {
        name: "note_id",
        unique: false,
        type: "BTREE",
        fields: ["note_id"],
      },
    ],
  };
  const FavoritesNoteModel = sequelize.define(
    "favorites_note_model",
    attributes,
    options
  );
  return FavoritesNoteModel;
};
