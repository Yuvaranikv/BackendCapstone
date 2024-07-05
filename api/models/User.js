// models/UserTest.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserTest = sequelize.define('UserTest', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'userstest'// Ensure this matches your actual table name in MySQL
 
});

module.exports = UserTest;
