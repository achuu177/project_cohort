const express = require('express');
const router = express.Router();
const { 
    getSellerProducts, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    getSellerOrders, 
    updateOrderStatus 
} = require('../controllers/sellerController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const roleAuth = require('../middlewares/roleAuth.js');

// Middleware to restrict access to sellers
router.use(authMiddleware, roleAuth('Seller'));

// Get all products managed by the seller
router.get('/products', getSellerProducts);

// Add a new product
router.post('/products', addProduct);

// Update an existing product
router.put('/products/:id', updateProduct);

// Delete a product
router.delete('/products/:id', deleteProduct);

// Get all orders related to the seller's products
router.get('/orders', getSellerOrders);

// Update the status of an order
router.put('/orders/:id/status', updateOrderStatus);

module.exports = { sellerRoutes: router };
