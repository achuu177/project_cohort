const { Product } = require('../models/productModel.js');

// Get All Products by Seller
exports.getSellerProducts = async (req, res) => {
    try {
        const products = await Product.find({ sellerId: req.user.id });

        if (!products.length) {
            return res.status(404).json({ message: "No products found for this seller" });
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve seller's products. Please try again later." });
    }
};

// Add a New Product
exports.addProduct = async (req, res) => {
    try {
        const { name, price, category, stock, description } = req.body;

        if (!name || !price || !category || !stock) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const product = new Product({
            name,
            price,
            category,
            stock,
            description,
            sellerId: req.user.id,
        });

        await product.save();
        res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Failed to add product. Please try again later." });
    }
};

// Update a Product
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            { _id: req.params.id, sellerId: req.user.id },
            req.body,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found or you're not authorized to update it" });
        }

        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Failed to update product. Please try again later." });
    }
};

// Delete a Product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ _id: req.params.id, sellerId: req.user.id });

        if (!product) {
            return res.status(404).json({ message: "Product not found or you're not authorized to delete it" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete product. Please try again later." });
    }
};

// Get All Orders for Seller's Products
exports.getSellerOrders = async (req, res) => {
    try {
        // Assuming the Order model contains product details, and we can match by sellerId
        const orders = await Order.find({ "items.sellerId": req.user.id }).populate('items.product');

        if (!orders.length) {
            return res.status(404).json({ message: "No orders found for this seller" });
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve seller's orders. Please try again later." });
    }
};

// Update Order Status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: "Order status is required" });
        }

        const order = await Order.findOneAndUpdate(
            { _id: req.params.id, "items.sellerId": req.user.id },
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found or you're not authorized to update it" });
        }

        res.status(200).json({ message: "Order status updated successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Failed to update order status. Please try again later." });
    }
};