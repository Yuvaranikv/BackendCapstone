const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 items per page

  try {
    const offset = (page - 1) * limit;
    const books = await Book.findAll({
      where: { isActive: true },
      offset: offset,
      limit: limit,
    });
   
    const totalBooksCount = await Book.count();

    res.json({
      books: books,
      totalCount: totalBooksCount,
    });
  } catch (err) {
    console.error("Error retrieving authors", err);
    res.status(500).send("Error retrieving authors");
  }
});

router.get('/all', async (req, res) => {
  
  try {
   
    const books = await Book.findAll({
      where: { isActive: true },
      // attributes: ['genre_id', 'genre_name'],
    });
 
 const totalBookCount = await Book.count();

 res.json({
  books: books,
  totalCount: totalBookCount
});
}
   catch (err) {
    console.error('Error retrieving books', err);
    res.status(500).send('Error retrieving books');
  }
});

// Get book by ID
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

// Add a new book
router.post("/add", async (req, res) => {
  try {
    const { title, author_id, genre_id, price, publication_date } = req.body;

    // Basic input validation
    if (!title || !author_id || !genre_id || !price || !publication_date) {
      return res.status(400).send("All fields are required");
    }
    // Further validation for price, publication_date format, etc., can be added

    const newBook = await Book.create({
      title,
      author_id,
      genre_id,
      price,
      publication_date,
    });

    res.status(201).json(newBook);
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).send("Error adding book");
  }
});

// Update a book
router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author_id, genre_id, price, publication_date } = req.body;

    // Basic input validation
    if (!title || !author_id || !genre_id || !price || !publication_date) {
      return res.status(400).send("All fields are required");
    }
    // Further validation for price, publication_date format, etc., can be added

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
    });

    res.json(book);
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).send("Error updating book");
  }
});

// Delete a book
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
