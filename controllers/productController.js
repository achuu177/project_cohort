const { Product } = require('../models/productModel.js');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (!products.length) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};

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

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Failed to update product. Please try again later." });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete product. Please try again later." });
    }
};
