const express = require('express');
const router = express.Router();
const { searchProducts } = require('../controllers/searchController.js');

// Search for products based on query
router.get('/', searchProducts);

module.exports = { searchRoutes: router };

