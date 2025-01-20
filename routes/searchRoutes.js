const express = require('express');
const router = express.Router();

// Search for products
router.get('/', (req, res) => {
  res.status(200).json([{ id: 1, name: 'Laptop' }, { id: 2, name: 'Phone' }]);
});

module.exports = router;
