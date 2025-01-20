const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');

// Get wishlist
router.get('/', authMiddleware, (req, res) => {
  res.status(200).json({ wishlistItems: [{ productId: 1, addedAt: '2025-01-01' }] });
});

// Add item to wishlist
router.post('/add', authMiddleware, (req, res) => {
  res.status(201).json({ message: 'Item added to wishlist' });
});

// Remove item from wishlist
router.delete('/remove/:id', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Item removed from wishlist' });
});

module.exports = router;