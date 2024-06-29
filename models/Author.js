const {DataTypes}=require('sequelize');
const sequelize=require('../config/database');

const Author=sequelize.define('Author',{
    author_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          notNull:{
            msg:'Name is required'
          },
          len:{
            args:[1,255],
            msg:'Name must be between 1 and 255 characters'
          }
        }
      },
      biography: {
        type: DataTypes.TEXT,
        allowNull: true, // If nullable in the database
      }
     
    }, {
      tableName: 'authors', // Specify the actual table name if different from the model name
      timestamps: false // If your table doesn't have createdAt and updatedAt columns
    });
    
    module.exports = Author;
