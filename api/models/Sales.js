// models/Sales.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Book = require("./Book");

const Sales = sequelize.define(
  "Sales",
  {
    salesid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    bookid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "books", 
        key: "book_id", 
      },
    },
    quantity_sold: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: "Quantity in stock must be a non-negative number",
        },
      },
    },
    salesdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "sales", 
  }
);
Sales.belongsTo(Book, { foreignKey: 'bookid' });
module.exports = Sales;
