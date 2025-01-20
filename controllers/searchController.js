const { Product } = require('../models/productModel.js');

exports.searchProducts = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }

        const products = await Product.find({ name: { $regex: query, $options: 'i' } });

        if (!products.length) {
            return res.status(404).json({ message: "No products found matching your query" });
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Failed to search products. Please try again later." });
    }
};