const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');
const {
    createOrder,
    getOrders,
    updateOrderStatus
} = require('../controllers/orderController.js'); // Import the orderController functions

// Place an order (POST)
router.post('/', authMiddleware, createOrder);

// Get all orders for the logged-in user (GET)
router.get('/', authMiddleware, getOrders);

// Update order status (PUT)
router.put('/:id', authMiddleware, updateOrderStatus);

module.exports =  router ;
