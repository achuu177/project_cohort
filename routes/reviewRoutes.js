const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');

// Add a review
router.post('/:productId', authMiddleware, (req, res) => {
  res.status(201).json({ message: 'Review added successfully' });
});

// Get reviews for a product
router.get('/:productId', (req, res) => {
  res.status(200).json([{ userId: 1, rating: 5, comment: 'Great product!' }]);
});

// Delete a review
router.delete('/:id', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Review deleted successfully' });
});

module.exports = router;