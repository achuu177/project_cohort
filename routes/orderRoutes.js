const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');

// Place an order
router.post('/', authMiddleware, (req, res) => {
  res.status(201).json({ message: 'Order placed successfully', orderId: 123 });
});

// Get orders for user
router.get('/', authMiddleware, (req, res) => {
  res.status(200).json([{ orderId: 1, total: 200 }, { orderId: 2, total: 300 }]);
});

// Update order status
router.put('/:id', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Order status updated successfully' });
});

module.exports = router;