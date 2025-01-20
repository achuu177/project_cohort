const express = require('express');
const router = express.Router();
const {
    getAllUsers,       // Controller function for viewing all users
    deleteUser,        // Controller function for deleting a user
} = require('../controllers/adminController.js');  // Import admin controller functions
const { authMiddleware } = require('../middlewares/authMiddleware.js');  // Authentication middleware
const { roleAuth } = require('../middlewares/roleAuth.js');  // Role authorization middleware



// View all users (Admin route - protected)
router.get('/users', authMiddleware, roleAuth('Admin'), getAllUsers);

// Delete a user (Admin route - protected)
router.delete('/users/:id', authMiddleware, roleAuth('Admin'), deleteUser);

// View platform stats (Admin route - protected)
router.get('/stats', authMiddleware, roleAuth('Admin'), (req, res) => {
    res.status(200).json({ totalUsers: 100, totalOrders: 500, revenue: 10000 });
});

module.exports = {adminRoutes : router};

