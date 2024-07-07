const express = require('express');
const Sales = require('../models/Sales');

const router = express.Router();

// GET all sales
router.get('/', async (req, res) => {
  try {
    const sales = await Sales.findAll({
      where: { isActive: true },
    });

    const totalSalesCount = await Sales.count();

    res.json({
      sales: sales,
      totalCount: totalSalesCount,
    });
  } catch (err) {
    console.error('Error retrieving sales', err);
    res.status(500).send('Error retrieving sales');
  }
});

// GET a single sale by ID
router.get('/:id', async (req, res) => {
  try {
    const sale = await Sales.findByPk(req.params.id);
    if (!sale) {
      return res.status(404).send('Sale not found');
    }
    res.json(sale);
  } catch (err) {
    console.error('Error retrieving sale', err);
    res.status(500).send('Error retrieving sale');
  }
});

// POST a new sale
router.post('/add', async (req, res) => {
  try {
    const { bookid, quantity_sold, salesdate, comments } = req.body;

    if (!bookid || !quantity_sold || !salesdate) {
      return res.status(400).send('Book ID, quantity sold, and sales date are required');
    }

    const newSale = await Sales.create({
      bookid,
      quantity_sold,
      salesdate,
      comments,
    });

    res.status(201).json(newSale);
  } catch (err) {
    console.error('Error adding sale', err);
    res.status(500).send('Error adding sale');
  }
});

// PUT update a sale by ID
router.put('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { bookid, quantity_sold, salesdate, comments } = req.body;

    if (!bookid || !quantity_sold || !salesdate) {
      return res.status(400).send('Book ID, quantity sold, and sales date are required');
    }

    const sale = await Sales.findByPk(id);
    if (!sale) {
      return res.status(404).send('Sale not found');
    }

    await sale.update({
      bookid,
      quantity_sold,
      salesdate,
      comments,
    });

    res.json(sale);
  } catch (err) {
    console.error('Error updating sale', err);
    res.status(500).send('Error updating sale');
  }
});

// DELETE a sale by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await Sales.findByPk(id);

    if (!sale) {
      return res.status(404).send('Sale not found');
    }

    await sale.destroy();
    res.send('Sale deleted successfully');
  } catch (err) {
    console.error('Error deleting sale', err);
    res.status(500).send('Error deleting sale');
  }
});

module.exports = router;
