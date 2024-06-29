const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Book = sequelize.define(
  "Book",
  {
    book_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
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
        model: "Authors",
        key: "author_id", // Primary key in the referenced table
      },
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Genres", // Name of the referenced table
        key: "genre_id", // Primary key in the referenced table
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,        // If nullable in the database
      validate: {
        isDecimal: true,
        min: {
          args: [0],
          msg: 'Price must be a positive number'
        }
      }
    },
    publication_date: {
      type: DataTypes.DATE,
      allowNull: true, // If nullable in the database
    },
  },
  {
    tableName: "books", // Specify the actual table name if different from the model name
    timestamps: false, // If your table doesn't have createdAt and updatedAt columns
  }
);

module.exports = Book;
