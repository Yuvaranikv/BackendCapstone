const sequelize = require('./config/database');
const Author = require('./models/Author');
const Book = require('./models/Book');
const Genre = require('./models/Genres');
const User = require('./models/User');
require('./config/associations'); // Ensure associations are loaded

async function syncAndCreate() {
  try {
    await sequelize.sync({ force: true });
    console.log('Models synchronized successfully.');

    const user = await User.create({ username: 'admin', password: 'admin123', isActive: true });
    console.log('User created:', user.toJSON());

    const authorsData = [
      { name: 'J.K. Rowling', biography: 'British author, best known for the Harry Potter series.', isActive: true },
      { name: 'George R.R. Martin', biography: 'American novelist and short story writer, known for A Song of Ice and Fire series.', isActive: true },
      { name: 'J.R.R. Tolkien', biography: 'English writer, poet, and philologist, author of The Lord of the Rings.', isActive: true },
      { name: 'Agatha Christie', biography: 'British writer known for her detective novels, especially those revolving around Hercule Poirot.', isActive: true },
      { name: 'Stephen King', biography: 'American author of horror, supernatural fiction, suspense, and fantasy novels.', isActive: true },
      { name: 'Isaac Asimov', biography: 'American writer and professor of biochemistry, known for his works of science fiction.', isActive: true },
      { name: 'Mark Twain', biography: 'American writer, humorist, entrepreneur, publisher, and lecturer.', isActive: true },
      { name: 'Ernest Hemingway', biography: 'American journalist, novelist, and short-story writer, won the Nobel Prize in Literature in 1954.', isActive: true },
      { name: 'Jane Austen', biography: 'English novelist known for her six major novels including Pride and Prejudice.', isActive: true },
      { name: 'Charles Dickens', biography: 'English writer and social critic, created some of the world’s best-known fictional characters.', isActive: true },
      { name: 'F. Scott Fitzgerald', biography: 'American novelist, known for The Great Gatsby.', isActive: true },
      { name: 'Harper Lee', biography: 'American novelist best known for her novel To Kill a Mockingbird.', isActive: true },
      { name: 'Gabriel Garcia Marquez', biography: 'Colombian novelist, short-story writer, screenwriter, and journalist.', isActive: true },
      { name: 'H.G. Wells', biography: 'English writer, known for his works of science fiction.', isActive: true },
      { name: 'Arthur Conan Doyle', biography: 'British writer and physician, created the character Sherlock Holmes.', isActive: true },
      { name: 'Leo Tolstoy', biography: 'Russian writer, author of War and Peace and Anna Karenina.', isActive: true },
      { name: 'Fyodor Dostoevsky', biography: 'Russian novelist, short story writer, essayist, and journalist.', isActive: true },
      { name: 'Mary Shelley', biography: 'English novelist, best known for her Gothic novel Frankenstein.', isActive: true },
      { name: 'Bram Stoker', biography: 'Irish author, best known for his Gothic novel Dracula.', isActive: true },
      { name: 'Homer', biography: 'Ancient Greek poet, traditionally said to be the author of the epic poems the Iliad and the Odyssey.', isActive: true }
    ];

    const genresData = [
      { genre_name: 'Fantasy', isActive: true },
      { genre_name: 'Science Fiction', isActive: true },
      { genre_name: 'Mystery', isActive: true },
      { genre_name: 'Thriller', isActive: true },
      { genre_name: 'Romance', isActive: true },
      { genre_name: 'Horror', isActive: true },
      { genre_name: 'Historical Fiction', isActive: true },
      { genre_name: 'Non-Fiction', isActive: true },
      { genre_name: 'Adventure', isActive: true },
      { genre_name: 'Young Adult', isActive: true },
      { genre_name: 'Classics', isActive: true },
      { genre_name: 'Literary Fiction', isActive: true },
      { genre_name: 'Dystopian', isActive: true },
      { genre_name: 'Magical Realism', isActive: true },
      { genre_name: 'Graphic Novel', isActive: true },
      { genre_name: 'Short Stories', isActive: true },
      { genre_name: 'Biography', isActive: true },
      { genre_name: 'Self-Help', isActive: true },
      { genre_name: 'Poetry', isActive: true },
      { genre_name: 'Drama', isActive: true }
    ];

    const authors = await Author.bulkCreate(authorsData);
    console.log('Authors created:', authors.map(author => author.toJSON()));

    const genres = await Genre.bulkCreate(genresData);
    console.log('Genres created:', genres.map(genre => genre.toJSON()));

    const booksData = [
      { title: 'Harry Potter and the Sorcerer\'s Stone', author_id: 1, genre_id: 1, price: 19.99, publication_date: '1997-06-26', isActive: true },
      { title: 'A Game of Thrones', author_id: 2, genre_id: 1, price: 25.99, publication_date: '1996-08-06', isActive: true },
      { title: 'The Fellowship of the Ring', author_id: 3, genre_id: 1, price: 22.99, publication_date: '1954-07-29', isActive: true },
      { title: 'Murder on the Orient Express', author_id: 4, genre_id: 3, price: 15.99, publication_date: '1934-01-01', isActive: true },
      { title: 'The Shining', author_id: 5, genre_id: 6, price: 18.99, publication_date: '1977-01-28', isActive: true },
      { title: 'Foundation', author_id: 6, genre_id: 2, price: 21.99, publication_date: '1951-05-01', isActive: true },
      { title: 'The Adventures of Tom Sawyer', author_id: 7, genre_id: 10, price: 14.99, publication_date: '1876-06-01', isActive: true },
      { title: 'The Old Man and the Sea', author_id: 8, genre_id: 12, price: 12.99, publication_date: '1952-09-01', isActive: true },
      { title: 'Pride and Prejudice', author_id: 9, genre_id: 5, price: 16.99, publication_date: '1813-01-28', isActive: true },
      { title: 'A Tale of Two Cities', author_id: 10, genre_id: 7, price: 17.99, publication_date: '1859-01-01', isActive: true },
      { title: 'The Great Gatsby', author_id: 11, genre_id: 11, price: 14.99, publication_date: '1925-04-10', isActive: true },
      { title: 'To Kill a Mockingbird', author_id: 12, genre_id: 12, price: 15.99, publication_date: '1960-07-11', isActive: true },
      { title: 'One Hundred Years of Solitude', author_id: 13, genre_id: 14, price: 18.99, publication_date: '1967-06-05', isActive: true },
      { title: 'The War of the Worlds', author_id: 14, genre_id: 2, price: 13.99, publication_date: '1898-01-01', isActive: true },
      { title: 'Sherlock Holmes: The Complete Novels and Stories', author_id: 15, genre_id: 3, price: 25.99, publication_date: '1927-01-01', isActive: true },
      { title: 'War and Peace', author_id: 16, genre_id: 7, price: 20.99, publication_date: '1869-01-01', isActive: true },
      { title: 'Crime and Punishment', author_id: 17, genre_id: 7, price: 19.99, publication_date: '1866-01-01', isActive: true },
      { title: 'Frankenstein', author_id: 18, genre_id: 6, price: 12.99, publication_date: '1818-01-01', isActive: true },
      { title: 'Dracula', author_id: 19, genre_id: 6, price: 13.99, publication_date: '1897-01-01', isActive: true },
      { title: 'The Iliad', author_id: 20, genre_id: 11, price: 22.99, publication_date: '800-01-01', isActive: true }
    ];

    const books = await Book.bulkCreate(booksData);
    console.log('Books created:', books.map(book => book.toJSON()));

  } catch (error) {
    console.error('Error syncing or creating models:', error);
  } finally {
    await sequelize.close();
  }
}

syncAndCreate();
