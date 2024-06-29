# BackendCapstone

# Bookstore API

This is a RESTful API for managing a bookstore's inventory, authors, and genres. The API is built using Node.js, Express, and Sequelize for MySQL.

## Table of Contents

- [Setup](#setup)
- [Database Schema](#database-schema)
- [Sample Data](#sample-data)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)

## Setup

1. **Clone the repository:**
    ```sh
    git clone https://github.com/Yuvaranikv/BackendCapstone.git
    cd BackendCapstone
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Set up the database:**
    Ensure you have MySQL installed and running. Create a database named `book_store`:

    ```sql
    CREATE DATABASE book_store;
    ```

4. **Run the SQL scripts to create tables and insert sample data:**

    ```sql
    USE book_store;

    -- Create authors table
    CREATE TABLE authors (
        author_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        biography TEXT
    );

    -- Create genres table
    CREATE TABLE genres (
        genre_id INT AUTO_INCREMENT PRIMARY KEY,
        genre_name VARCHAR(255) NOT NULL
    );

    -- Create books table
    CREATE TABLE books (
        book_id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author_id INT,
        genre_id INT,
        price DECIMAL(10,2),
        publication_date DATE,
        FOREIGN KEY (author_id) REFERENCES authors(author_id),
        FOREIGN KEY (genre_id) REFERENCES genres(genre_id)
    );
    ```

## Sample Data

Insert sample data into the database:

```sql
-- Insert sample authors
INSERT INTO authors (name, biography) VALUES
('J.K. Rowling', 'British author, best known for the Harry Potter series.'),
('George R.R. Martin', 'American novelist and short story writer, known for A Song of Ice and Fire series.'),
('J.R.R. Tolkien', 'English writer, poet, and philologist, author of The Lord of the Rings.'),
('Agatha Christie', 'British writer known for her detective novels, especially those revolving around Hercule Poirot.'),
('Stephen King', 'American author of horror, supernatural fiction, suspense, and fantasy novels.'),
('Isaac Asimov', 'American writer and professor of biochemistry, known for his works of science fiction.'),
('Mark Twain', 'American writer, humorist, entrepreneur, publisher, and lecturer.'),
('Ernest Hemingway', 'American journalist, novelist, and short-story writer, won the Nobel Prize in Literature in 1954.'),
('Jane Austen', 'English novelist known for her six major novels including Pride and Prejudice.'),
('Charles Dickens', 'English writer and social critic, created some of the world’s best-known fictional characters.'),
('F. Scott Fitzgerald', 'American novelist, known for The Great Gatsby.'),
('Harper Lee', 'American novelist best known for her novel To Kill a Mockingbird.'),
('Gabriel Garcia Marquez', 'Colombian novelist, short-story writer, screenwriter, and journalist.'),
('H.G. Wells', 'English writer, known for his works of science fiction.'),
('Arthur Conan Doyle', 'British writer and physician, created the character Sherlock Holmes.'),
('Leo Tolstoy', 'Russian writer, author of War and Peace and Anna Karenina.'),
('Fyodor Dostoevsky', 'Russian novelist, short story writer, essayist, and journalist.'),
('Mary Shelley', 'English novelist, best known for her Gothic novel Frankenstein.'),
('Bram Stoker', 'Irish author, best known for his Gothic novel Dracula.'),
('Homer', 'Ancient Greek poet, traditionally said to be the author of the epic poems the Iliad and the Odyssey.');

-- Insert sample genres
INSERT INTO genres (genre_name) VALUES
('Fantasy'),
('Science Fiction'),
('Mystery'),
('Thriller'),
('Romance'),
('Horror'),
('Historical Fiction'),
('Non-Fiction'),
('Adventure'),
('Young Adult'),
('Classics'),
('Literary Fiction'),
('Dystopian'),
('Magical Realism'),
('Graphic Novel'),
('Short Stories'),
('Biography'),
('Self-Help'),
('Poetry'),
('Drama');

-- Insert sample books
INSERT INTO books (title, author_id, genre_id, price, publication_date) VALUES
('Harry Potter and the Sorcerer''s Stone', 1, 1, 19.99, '1997-06-26'),
('A Game of Thrones', 2, 1, 25.99, '1996-08-06'),
('The Fellowship of the Ring', 3, 1, 22.99, '1954-07-29'),
('Murder on the Orient Express', 4, 3, 15.99, '1934-01-01'),
('The Shining', 5, 6, 18.99, '1977-01-28'),
('Foundation', 6, 2, 21.99, '1951-05-01'),
('The Adventures of Tom Sawyer', 7, 10, 14.99, '1876-06-01'),
('The Old Man and the Sea', 8, 12, 12.99, '1952-09-01'),
('Pride and Prejudice', 9, 5, 16.99, '1813-01-28'),
('A Tale of Two Cities', 10, 7, 17.99, '1859-01-01'),
('The Great Gatsby', 11, 11, 14.99, '1925-04-10'),
('To Kill a Mockingbird', 12, 12, 15.99, '1960-07-11'),
('One Hundred Years of Solitude', 13, 14, 18.99, '1967-06-05'),
('The War of the Worlds', 14, 2, 13.99, '1898-01-01'),
('Sherlock Holmes: The Complete Novels and Stories', 15, 3, 25.99, '1927-01-01'),
('War and Peace', 16, 7, 20.99, '1869-01-01'),
('Crime and Punishment', 17, 7, 19.99, '1866-01-01'),
('Frankenstein', 18, 6, 12.99, '1818-01-01'),
('Dracula', 19, 6, 13.99, '1897-01-01'),
('The Iliad', 20, 11, 22.99, '800-01-01');

API Endpoints
Books
GET /books : Retrieve a list of all books
GET /books/{book_id} : Retrieve details of a specific book
POST /books : Add a new book
PUT /books/{book_id} : Update details of an existing book
DELETE /books/{book_id} : Delete a specific book
Authors
GET /authors : Retrieve a list of all authors
GET /authors/{author_id} : Retrieve details of a specific author
POST /authors : Add a new author
PUT /authors/{author_id} : Update details of an existing author
DELETE /authors/{author_id} : Delete a specific author
Genres
GET /genres : Retrieve a list of all genres
GET /genres/{genre_id} : Retrieve details of a specific genre
POST /genres : Add a new genre
