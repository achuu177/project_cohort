const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');
const { addReview, getReviewsByProduct, deleteReview } = require('../controllers/reviewController.js');

// Add a review for a specific product
router.post('/:productId', authMiddleware, addReview);

// Get all reviews for a specific product
router.get('/:productId', getReviewsByProduct);

// Delete a specific review by review ID
router.delete('/:id', authMiddleware, deleteReview);

module.exports = router ;

