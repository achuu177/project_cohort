const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');
const {
    processPayment,
    getPaymentDetails
} = require('../controllers/paymentController.js'); // Import the paymentController functions

// Process payment (POST)
router.post('/', authMiddleware, processPayment);

// Get payment details (GET)
router.get('/:id', authMiddleware, getPaymentDetails);

module.exports = { paymentRoutes: router };
