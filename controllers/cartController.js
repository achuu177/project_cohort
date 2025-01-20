const { Cart } = require('../models/cartModel.js');

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: "Your cart is empty" });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve cart. Please try again later." });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }

        const cart = await Cart.findOneAndUpdate(
            { userId: req.user.id },
            { $push: { items: { product: productId, quantity } } },
            { new: true, upsert: true }
        );
        res.status(201).json({ message: "Item added to cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Failed to add item to cart. Please try again later." });
    }
};

exports.updateCart = async (req, res) => {
    try {
        const { quantity } = req.body;

        if (!quantity) {
            return res.status(400).json({ message: "Quantity is required" });
        }

        const cart = await Cart.findOneAndUpdate(
            { userId: req.user.id, 'items._id': req.params.id },
            { $set: { 'items.$.quantity': quantity } },
            { new: true }
        );

        if (!cart) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        res.status(200).json({ message: "Cart item updated", cart });
    } catch (error) {
        res.status(500).json({ message: "Failed to update cart item. Please try again later." });
    }
};


exports.removeFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOneAndUpdate(
            { userId: req.user.id },
            { $pull: { items: { _id: req.params.id } } },
            { new: true }
        );
        if (!cart) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        res.status(200).json({ message: "Item removed from cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Failed to remove item from cart. Please try again later." });
    }
};
