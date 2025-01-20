const express = require('express');
const router = express.Router();
const {
    userSignup,
    userLogin,
    getUserProfile,
    userLogout,
} = require('../controllers/userController.js'); // Import the userController functions
const {authMiddleware} = require('../middlewares/authMiddleware.js'); // Middleware for protected routes



// User signup
router.post('/signup', userSignup);

// User login
router.post('/login', userLogin);

// Get user profile (protected route)
router.get('/profile', authMiddleware, getUserProfile);

// User logout
router.post('/logout', authMiddleware, userLogout);

module.exports = { userRoutes: router };

