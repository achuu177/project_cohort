const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart, updateCart } = require('../controllers/cartController.js'); // Import cart controller functions
const authMiddleware = require('../middlewares/authMiddleware.js'); // Authentication middleware

// Get cart (protected route)
router.get('/', authMiddleware, getCart);

// Add item to cart (protected route)
router.post('/add', authMiddleware, addToCart);

// Update item in cart (protected route)
router.put('/update/:id', authMiddleware, updateCart);

// Remove item from cart (protected route)
router.delete('/remove/:id', authMiddleware, removeFromCart);

module.exports = router ;

