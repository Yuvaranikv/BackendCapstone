const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');
const { Op } = require('sequelize');
const Book=require('../models/Book');

// GET all purchases
router.get('/all', async (req, res) => {
  try {
    const purchases = await Purchase.findAll();
    res.json(purchases);
  } catch (err) {
    console.error('Error retrieving purchases:', err);
    res.status(500).send('Error retrieving purchases');
  }
});

// GET paginated purchases with books included
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;  // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 items per page

  try {
    const offset = (page - 1) * limit;
    const purchases = await Purchase.findAndCountAll({
      where: { isActive: true },
      order: [['createdAt', 'DESC']],
      include: [{ model: Book, attributes: ['title'] }],
      offset: offset,
      limit: limit,
    });

    res.json({
      purchases: purchases.rows,
      totalCount: purchases.count
    });
  } catch (err) {
    console.error('Error retrieving purchases:', err);
    res.status(500).send('Error retrieving purchases');
  }
});

// GET a specific purchase by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const purchase = await Purchase.findByPk(id);
    if (!purchase) {
      return res.status(404).send('Purchase not found');
    }
    res.json(purchase);
  } catch (err) {
    console.error('Error retrieving purchase:', err);
    res.status(500).send('Error retrieving purchase');
  }
});

// POST a new purchase
router.post('/add', async (req, res) => {
  const { bookid, quantityinstock, purchasedate, comments } = req.body;
  try {
    const newPurchase = await Purchase.create({
      bookid,
      quantityinstock,
      purchasedate,
      comments,
    });
    res.status(201).json(newPurchase);
  } catch (err) {
    console.error('Error adding purchase:', err);
    res.status(500).send('Error adding purchase');
  }
});

// PUT update a purchase by ID
router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { bookid, quantityinstock, purchasedate, comments } = req.body;
  try {
    const purchase = await Purchase.findByPk(id);
    if (!purchase) {
      return res.status(404).send('Purchase not found');
    }
    await purchase.update({
      bookid,
      quantityinstock,
      purchasedate,
      comments,
    });
    res.json(purchase);
  } catch (err) {
    console.error('Error updating purchase:', err);
    res.status(500).send('Error updating purchase');
  }
});

// DELETE a purchase by ID
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const purchase = await Purchase.findByPk(id);
    if (!purchase) {
      return res.status(404).send('Purchase not found');
    }
    await purchase.destroy();
    res.send('Purchase deleted successfully');
  } catch (err) {
    console.error('Error deleting purchase:', err);
    res.status(500).send('Error deleting purchase');
  }
});


module.exports = router;
