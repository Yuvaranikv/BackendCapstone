const express = require('express');
const router = express.Router();
const Genre = require('../models/Genres'); 
const Book=require('../models/Book');

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;  // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 items per page

  try {
    const offset = (page - 1) * limit;
    const genres = await Genre.findAll({
      where: { isActive: true },
      offset: offset,
      limit: limit
    });
 
 const totalGenresCount = await Genre.count();

 res.json({
  genres: genres,
  totalCount: totalGenresCount
});
}
   catch (err) {
    console.error('Error retrieving genres', err);
    res.status(500).send('Error retrieving genres');
  }
});

router.get('/all', async (req, res) => {
  
  try {
   
    const genres = await Genre.findAll({
      where: { isActive: true },
      attributes: ['genre_id', 'genre_name'],
    });
 
 const totalGenresCount = await Genre.count();

 res.json({
  genres: genres,
  totalCount: totalGenresCount
});
}
   catch (err) {
    console.error('Error retrieving genres', err);
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
router.post('/add', async (req, res) => {
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

// Update a Genres
router.put('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { genre_name } = req.body;

    const genres = await Genre.findByPk(id);
    if (!genres) {
      return res.status(404).send('genres not found');
    }
   // Validate input
   if (!genre_name ) {
   return res.status(400).send('Genres Name is required');
   }
    await genres.update({
      genre_name
    });

    res.json(genres);
  } catch (err) {
    console.error('Error updating genres:', err);
    res.status(500).send('Error updating genres');
  }
});


// Soft delete a genre
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await Genre.findByPk(id);

    if (!genre) {
      return res.status(404).send('Genre not found');
    }

    // Set isActive to false
    genre.isActive = false;
    await genre.save();

    
    await Book.update(
      { isActive: false },
      { where: { genre_id: id } }
    );

    res.send('Genre and related books deactivated successfully');
  } catch (err) {
    console.error('Error deactivating genre:', err);
    res.status(500).send('Error deactivating genre');
  }
});

module.exports = router;
