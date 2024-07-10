const express = require('express');
const multer = require('multer');
const path = require('path');
const Book = require('../models/Book');
const Genres = require('../models/Genres');
const Author=require('../models/Author');

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const offset = (page - 1) * limit;
    const books = await Book.findAll({
      where: { isActive: true },
      offset: offset,
      limit: limit,
      include: [
        { model: Author, as: 'Author', attributes: ['name'] },
        { model: Genres, as: 'Genres', attributes: ['genre_name'] }
      ],
    });

    const totalBooksCount = await Book.count();

    res.json({
      books: books,
      totalCount: totalBooksCount,
    });
  } catch (err) {
    console.error("Error retrieving books", err);
    res.status(500).send("Error retrieving books");
  }
});

router.get('/all', async (req, res) => {
  try {
    const books = await Book.findAll({
      where: { isActive: true },
      include: [
        { model: Author, as: 'Author', attributes: ['name'] },
        { model: Genres, as: 'Genres', attributes: ['genre_name'] }
      ],
    });

    const totalBookCount = await Book.count();

    res.json({
      books: books,
      totalCount: totalBookCount,
    });
  } catch (err) {
    console.error('Error retrieving books', err);
    res.status(500).send('Error retrieving books');
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.json(book);
  } catch (err) {
    console.error("Error retrieving book:", err);
    res.status(500).send("Error retrieving book");
  }
});

router.post('/upload', upload.single('file'), (req, res) => {
  try {
    const filePath = `/uploads/${req.file.filename}`;
    res.status(200).json({ filePath });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { title, author_id, genre_id, price, publication_date, ISBN, imageURL, description } = req.body;

    if (!title || !author_id || !genre_id || !price || !publication_date || !ISBN ) {
      return res.status(400).send("All fields are required");
    }

    const newBook = await Book.create({
      title,
      author_id,
      genre_id,
      price,
      publication_date,
      ISBN,
      imageURL,
      description,
    });

    res.status(201).json(newBook);
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).send("Error adding book");
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author_id, genre_id, price, publication_date, ISBN, imageURL, description } = req.body;

    if (!title || !author_id || !genre_id || !price || !publication_date || !ISBN ) {
      return res.status(400).send("All fields are required");
    }

    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).send("Book not found");
    }

    await book.update({
      title,
      author_id,
      genre_id,
      price,
      publication_date,
      ISBN,
      imageURL,
      description,
    });

    res.json(book);
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).send("Error updating book");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).send("Book not found");
    }

    await book.destroy();
    res.send("Book deleted successfully");
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).send("Error deleting book");
  }
});

module.exports = router;
