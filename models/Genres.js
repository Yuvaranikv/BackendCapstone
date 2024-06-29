const {DataTypes}=require('sequelize');
const sequelize=require('../config/database');

const Genres=sequelize.define('Genres',{
    genre_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      genre_name: {
        type: DataTypes.STRING,
        allowNull: false
      }
     
     
    }, {
      tableName: 'genres', // Specify the actual table name if different from the model name
      timestamps: false // If your table doesn't have createdAt and updatedAt columns
    });
    
    module.exports = Genres;
