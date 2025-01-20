const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');
const roleAuth = require('../middlewares/roleAuth.js');

// View all users
router.get('/users', authMiddleware, roleAuth('Admin'), (req, res) => {
  res.status(200).json([{ id: 1, username: 'User1' }, { id: 2, username: 'User2' }]);
});

// Delete a user
router.delete('/users/:id', authMiddleware, roleAuth('Admin'), (req, res) => {
  res.status(200).json({ message: `User ${req.params.id} deleted successfully` });
});

// View platform stats
router.get('/stats', authMiddleware, roleAuth('Admin'), (req, res) => {
  res.status(200).json({ totalUsers: 100, totalOrders: 500, revenue: 10000 });
});

module.exports = router;
