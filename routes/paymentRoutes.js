const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');

// Process payment
router.post('/', authMiddleware, (req, res) => {
  res.status(201).json({ message: 'Payment processed successfully', paymentId: 456 });
});

// Get payment details
router.get('/:id', authMiddleware, (req, res) => {
  res.status(200).json({ paymentId: req.params.id, status: 'Completed' });
});

module.exports = router;
