const express = require('express');
const router = express.Router();
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlistController.js'); // Import the wishlistController functions
const { authMiddleware } = require('../middlewares/authMiddleware.js'); // Middleware for protected routes

// Get wishlist
router.get('/', authMiddleware, getWishlist); // Call getWishlist function

// Add item to wishlist
router.post('/add', authMiddleware, addToWishlist); // Call addToWishlist function

// Remove item from wishlist
router.delete('/remove/:id', authMiddleware, removeFromWishlist); // Call removeFromWishlist function

module.exports = { wishlistRoutes: router };
