const express = require('express');
const router = express.Router();
const Genre = require('../models/Genres'); // Assuming your model is named 'Genre' (singular form)

// List all genres
router.get('/', async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.json(genres);
  } catch (err) {
    console.error('Error retrieving genres:', err);
    res.status(500).send('Error retrieving genres');
  }
});

// Get genre by ID
router.get('/:id', async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (!genre) {
      return res.status(404).send('Genre not found');
    }
    res.json(genre);
  } catch (err) {
    console.error('Error retrieving genres:', err);
    res.status(500).send('Error retrieving genres');
  }
});

// Add a new genre
router.post('/', async (req, res) => {
  try {
    const { genre_name } = req.body;

    // Input validation
    if (!genre_name) {
      return res.status(400).send('Genres name is required');
    }

    const newGenre = await Genre.create({ genre_name });

    res.status(201).json(newGenre);
  } catch (err) {
    console.error('Error adding genres:', err);
    res.status(500).send('Error adding genres');
  }
});

module.exports = router;
