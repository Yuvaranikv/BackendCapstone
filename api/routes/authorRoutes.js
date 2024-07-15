const express = require("express");
const router = express.Router();
const Author = require("../models/Author");
const Book = require("../models/Book");

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 items per page
  //let { direction } = req.query;

  try {
    const offset = (page - 1) * limit;
    //direction = direction === "descend" ? "DESC" : "ASC"; // Default to ASC if direction is invalid or not provided
   // console.log(direction);
    const authors = await Author.findAll({
      where: { isActive: true },
      order: [['createdAt', 'DESC']],
      offset: offset,
      limit: limit,
    });

    // Fetch total count of authors
    const totalAuthorsCount = await Author.count({ where: { isActive: true } });

    res.json({
      authors: authors,
      totalCount: totalAuthorsCount,
    });
  } catch (err) {
    console.error("Error retrieving authors", err);
    res.status(500).send("Error retrieving authors");
  }
});

router.get("/all", async (req, res) => {
  let { direction } = req.query;
  try {
    //direction = direction === "descend" ? "DESC" : "ASC"; 
    const authors = await Author.findAll({
      where: { isActive: true },
      order: [['createdAt', 'DESC']],
      attributes: ["author_id", "name"],
    });
    // Fetch total count of authors
    const totalAuthorsCount = await Author.count({ where: { isActive: true } });

    res.json({
      authors: authors,
      totalCount: totalAuthorsCount,
    });
  } catch (err) {
    console.error("Error retrieving authors", err);
    res.status(500).send("Error retrieving authors");
  }
});

//Get author by ID
router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) {
      res.status(404).send("author not found");
      return;
    }
    res.json(author);
  } catch (err) {
    console.error("Error retrieving author:", err);
    res.status(500).send("Error retrieving author");
  }
});

// Add a new author
router.post("/add", async (req, res) => {
  try {
    const { name, biography } = req.body;
    //Validate input
    if (!name) {
      return res.status(400).send("Name is required");
    }
    const newAuthor = await Author.create({
      name,
      biography,
    });

    res.status(201).json(newAuthor);
  } catch (err) {
    console.error("Error adding author:", err);
    res.status(500).send("Error adding author");
  }
});

// Update an author
router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, biography } = req.body;

    const author = await Author.findByPk(id);
    if (!author) {
      return res.status(404).send("Author not found");
    }
    // Validate input
    if (!name) {
      return res.status(400).send("Name is required");
    }
    await author.update({
      name,
      biography,
    });

    res.json(author);
  } catch (err) {
    console.error("Error updating author:", err);
    res.status(500).send("Error updating author");
  }
});

// Soft delete an author
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findByPk(id);

    if (!author) {
      return res.status(404).send("Author not found");
    }

    // Set isActive to false
    author.isActive = false;
    await author.save();

    // Optionally, you can also set isActive to false for related books
    await Book.update({ isActive: false }, { where: { author_id: id } });

    res.send("Author and related books deactivated successfully");
  } catch (err) {
    console.error("Error deactivating author:", err);
    res.status(500).send("Error deactivating author");
  }
});

router.get("/all/sort", async (req, res) => {
  try {
    let { direction } = req.query;

    direction = direction === "descend" ? "DESC" : "ASC"; // Default to ASC if direction is invalid or not provided

    const authors = await Author.findAll({
      where: { isActive: true },
      attributes: ["author_id", "name"],
      order: [["name", direction]], // Sort by name in ascending or descending order
    });

    // Fetch total count of active authors
    const totalAuthorsCount = await Author.count({ where: { isActive: true } });

    res.json({
      authors: authors,
      totalCount: totalAuthorsCount,
    });
  } catch (err) {
    console.error("Error retrieving authors", err);
    res.status(500).send("Error retrieving authors");
  }
});

module.exports = router;
