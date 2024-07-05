// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('testbookstore', 'root', 'admin123', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
