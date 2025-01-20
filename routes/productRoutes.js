const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');

// Get all products
router.get('/', (req, res) => {
  res.status(200).json([{ id: 1, name: 'Product A' }, { id: 2, name: 'Product B' }]);
});

// Get a specific product
router.get('/:id', (req, res) => {
  res.status(200).json({ id: req.params.id, name: 'Product A', price: 100 });
});

// Add a new product
router.post('/', authMiddleware, (req, res) => {
  res.status(201).json({ message: 'Product added successfully' });
});

// Update a product
router.put('/:id', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Product updated successfully' });
});

// Delete a product
router.delete('/:id', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Product deleted successfully' });
});

module.exports = router;
