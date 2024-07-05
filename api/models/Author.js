// models/Author.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Author = sequelize.define('Author', {
  author_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Name is required',
      },
      len: {
        args: [1, 255],
        msg: 'Name must be between 1 and 255 characters',
      },
    },
  },
  biography: {
    type: DataTypes.TEXT,
    allowNull: true, // If nullable in the database
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'authors' // Specify the actual table name if different from the model name
 
});

module.exports = Author;
