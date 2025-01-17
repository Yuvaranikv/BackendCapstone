const sequelize = require('./config/database');
const Author = require('./models/Author');
const Book = require('./models/Book');
const Genre = require('./models/Genres');
const User = require('./models/User');
const Purchase = require('./models/Purchase');
const Sales = require('./models/Sales');

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
      { 
        title: 'Harry Potter and the Sorcerer\'s Stone', 
        author_id: 1, 
        genre_id: 1, 
        price: 19.99, 
        publication_date: '1997-06-26', 
        ISBN: '9780590353427',
        imageURL: 'https://example.com/harry_potter.jpg',
        description: 'The first book in the Harry Potter series by J.K. Rowling.',
        rating: 4.9
      },
      { 
        title: 'A Game of Thrones', 
        author_id: 2, 
        genre_id: 1, 
        price: 25.99, 
        publication_date: '1996-08-06', 
        ISBN: '9780553381689',
        imageURL: 'https://example.com/game_of_thrones.jpg',
        description: 'The first book in the A Song of Ice and Fire series by George R.R. Martin.',
        rating: 4.8
      },
      { 
        title: 'To Kill a Mockingbird', 
        author_id: 3, 
        genre_id: 2, 
        price: 14.99, 
        publication_date: '1960-07-11', 
        ISBN: '9780061120084',
        imageURL: 'https://example.com/to_kill_a_mockingbird.jpg',
        description: 'A novel by Harper Lee published in 1960, instantly successful and has become a classic of modern American literature.',
        rating: 4.7
      },
      { 
        title: '1984', 
        author_id: 4, 
        genre_id: 3, 
        price: 15.99, 
        publication_date: '1949-06-08', 
        ISBN: '9780451524935',
        imageURL: 'https://example.com/1984.jpg',
        description: 'A dystopian social science fiction novel and cautionary tale, written by the English writer George Orwell.',
        rating: 4.6
      },
      { 
        title: 'Pride and Prejudice', 
        author_id: 5, 
        genre_id: 4, 
        price: 12.99, 
        publication_date: '1813-01-28', 
        ISBN: '9780141439518',
        imageURL: 'https://example.com/pride_and_prejudice.jpg',
        description: 'A romantic novel of manners written by Jane Austen in 1813.',
        rating: 4.8
      },
      { 
        title: 'The Hobbit', 
        author_id: 6, 
        genre_id: 1, 
        price: 18.99, 
        publication_date: '1937-09-21', 
        ISBN: '9780547928227',
        imageURL: 'https://example.com/the_hobbit.jpg',
        description: 'A children\'s fantasy novel by English author J.R.R. Tolkien.',
        rating: 4.9
      },
      { 
        title: 'The Catcher in the Rye', 
        author_id: 7, 
        genre_id: 5, 
        price: 13.99, 
        publication_date: '1951-07-16', 
        ISBN: '9780316769488',
        imageURL: 'https://example.com/the_catcher_in_the_rye.jpg',
        description: 'A novel by J.D. Salinger, partially published in serial form in 1945-1946 and as a novel in 1951.',
        rating: 4.5
      },
      { 
        title: 'The Great Gatsby', 
        author_id: 8, 
        genre_id: 5, 
        price: 10.99, 
        publication_date: '1925-04-10', 
        ISBN: '9780743273565',
        imageURL: 'https://example.com/the_great_gatsby.jpg',
        description: 'A 1925 novel written by American author F. Scott Fitzgerald that follows a cast of characters living in the fictional towns of West Egg and East Egg on prosperous Long Island in the summer of 1922.',
        rating: 4.4
      },
      { 
        title: 'Moby Dick', 
        author_id: 9, 
        genre_id: 6, 
        price: 11.99, 
        publication_date: '1851-10-18', 
        ISBN: '9781503280786',
        imageURL: 'https://example.com/moby_dick.jpg',
        description: 'A novel by Herman Melville, in which Captain Ahab seeks vengeance against Moby Dick, a white whale.',
        rating: 4.2
      },
      { 
        title: 'War and Peace', 
        author_id: 10, 
        genre_id: 7, 
        price: 20.99, 
        publication_date: '1869-01-01', 
        ISBN: '9781853260629',
        imageURL: 'https://example.com/war_and_peace.jpg',
        description: 'A novel by the Russian author Leo Tolstoy, first published from 1865 to 1869.',
        rating: 4.7
      }
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
