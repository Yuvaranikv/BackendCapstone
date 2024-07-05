// config/associations.js
const Author = require('../models/Author');
const Book = require('../models/Book');
const Genres = require('../models/Genres');

Author.hasMany(Book, { foreignKey: 'author_id' });
Book.belongsTo(Author, { foreignKey: 'author_id' });

Genres.hasMany(Book, { foreignKey: 'genre_id' });
Book.belongsTo(Genres, { foreignKey: 'genre_id' });
