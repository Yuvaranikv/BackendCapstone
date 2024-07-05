const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Genres = sequelize.define(
  "Genres",
  {
    genre_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    genre_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "genres",
  }
);

module.exports = Genres;
