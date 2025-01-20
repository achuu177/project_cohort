const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');

// Get cart
router.get('/', authMiddleware, (req, res) => {
  res.status(200).json({ cartItems: [{ productId: 1, quantity: 2 }] });
});

// Add item to cart
router.post('/add', authMiddleware, (req, res) => {
  res.status(201).json({ message: 'Item added to cart' });
});

// Update item in cart
router.put('/update/:id', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Cart item updated' });
});

// Remove item from cart
router.delete('/remove/:id', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Item removed from cart' });
});

module.exports = router;
