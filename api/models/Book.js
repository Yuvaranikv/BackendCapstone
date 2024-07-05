// models/Book.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Author = require("./Author");
const Genre = require("./Genres");

const Book = sequelize.define(
  "Book",
  {
    book_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Title is required",
        },
        len: {
          args: [1, 255],
          msg: "Title must be between 1 and 255 characters",
        },
      },
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "authors",
        key: "author_id",
      },
     },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Genres",
        key: "genre_id",
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        isDecimal: true,
        min: {
          args: [0],
          msg: "Price must be a positive number",
        },
      },
    },
    publication_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ISBN: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    description: {
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
    tableName: "books",
  }
);

module.exports = Book;
