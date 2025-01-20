const { Review } = require('../models/reviewModel.js');

exports.addReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;

        if (!productId || !rating || !comment) {
            return res.status(400).json({ message: "Product ID, rating, and comment are required" });
        }

        const review = new Review({
            productId,
            userId: req.user.id,
            rating,
            comment,
        });

        await review.save();
        res.status(201).json({ message: "Review added successfully", review });
    } catch (error) {
        res.status(500).json({ message: "Failed to add review. Please try again later." });
    }
};

exports.getReviewsByProduct = async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.productId });

        if (!reviews.length) {
            return res.status(404).json({ message: "No reviews found for this product" });
        }

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve reviews. Please try again later." });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        // Check if the logged-in user is the one who created the review or if the user is an admin
        if (review.userId.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({ message: "You are not authorized to delete this review" });
        }

        await review.remove();
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete review. Please try again later." });
    }
};