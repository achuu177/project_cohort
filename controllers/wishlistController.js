const { Wishlist } = require('../models/wishlistModel.js');

exports.getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ userId: req.user.id }).populate('products');
        if (!wishlist) {
            return res.status(404).json({ message: "Your wishlist is empty" });
        }
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve wishlist. Please try again later." });
    }
};

exports.addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const wishlist = await Wishlist.findOneAndUpdate(
            { userId: req.user.id },
            { $addToSet: { products: productId } },
            { new: true, upsert: true }
        );
        res.status(201).json({ message: "Item added to wishlist", wishlist });
    } catch (error) {
        res.status(500).json({ message: "Failed to add item to wishlist. Please try again later." });
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOneAndUpdate(
            { userId: req.user.id },
            { $pull: { products: req.params.id } },
            { new: true }
        );
        if (!wishlist) {
            return res.status(404).json({ message: "Item not found in wishlist" });
        }
        res.status(200).json({ message: "Item removed from wishlist", wishlist });
    } catch (error) {
        res.status(500).json({ message: "Failed to remove item from wishlist. Please try again later." });
    }
};
