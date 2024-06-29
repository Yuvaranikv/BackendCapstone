const express=require('express');
const router=express.Router();
const Author=require('../models/Author');

//List all authors
router.get('/',async(req,res)=>{
    try{
        const authors=await Author.findAll();
        res.json(authors);
    }
    catch(err)
    {
        console.error('Error retrieving authors',err)
        res.status(500).send('Error retrieving authors:');
    }
});

//Get author by ID
router.get('/:id',async(req,res)=>{
    try{
        const author=await Author.findByPk(req.params.id);
        if(!author)
        {
        res.status(404).send('author not found');
        return;
    }
    res.json(author);
}catch(err)
{
    console.error('Error retrieving author:', err);
    res.status(500).send('Error retrieving author');
}
});



// Add a new author
router.post('/', async (req, res) => {
    try {
      const { name,biography } = req.body;
      //Validate input
      if(!name || !biography)
      {
        return res.status(400).send('Name and biography are required');
      }
      const newAuthor = await Author.create({
       name,biography
      });
  
      res.status(201).json(newAuthor);
    } catch (err) {
      console.error('Error adding author:', err);
      res.status(500).send('Error adding author');
    }
  });

// Update an author
router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name,biography } = req.body;
  
      const author = await Author.findByPk(id);
      if (!author) {
        return res.status(404).send('Author not found');
      }
     // Validate input
     if (!name || !biography) {
     return res.status(400).send('Name and biography are required');
     }
      await author.update({
        name,
        biography
      });
  
      res.json(author);
    } catch (err) {
      console.error('Error updating author:', err);
      res.status(500).send('Error updating author');
    }
  });


  // Delete a author
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const author = await Author.findByPk(id);
  
      if (!author) {
        return res.status(404).send('Author not found');
      }
  
      await author.destroy();
      res.send('Author deleted successfully');
    } catch (err) {
      console.error('Error deleting author:', err);
      res.status(500).send('Error deleting author');
    }
  });
module.exports = router;