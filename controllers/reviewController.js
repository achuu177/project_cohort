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
