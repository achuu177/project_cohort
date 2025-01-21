const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');
const { 
  getProducts, 
  getProductById, 
  addProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController.js');

// Get all products
router.get('/', getProducts);

// Get a specific product
router.get('/:id', getProductById);

// Add a new product
router.post('/', authMiddleware, addProduct);

// Update a product
router.put('/:id', authMiddleware, updateProduct);

// Delete a product
router.delete('/:id', authMiddleware, deleteProduct);

module.exports =  router ;
