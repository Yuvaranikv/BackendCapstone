// config/associations.js
const Author = require('../models/Author');
const Book = require('../models/Book');
const Genres = require('../models/Genres');
const Sales = require('../models/Sales');
const Purchase = require('../models/Purchase');

Author.hasMany(Book, { foreignKey: 'author_id' });
Book.belongsTo(Author, { foreignKey: 'author_id' });

Genres.hasMany(Book, { foreignKey: 'genre_id' });
Book.belongsTo(Genres, { foreignKey: 'genre_id' });
Purchase.belongsTo(Book, { foreignKey: 'bookid' });
Sales.belongsTo(Book, { foreignKey: 'bookid' });

module.exports = {
    Author,
    Book,
    Genres,
    Sales,
    Purchase
  };
