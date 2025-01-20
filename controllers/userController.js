const { User } = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token.js');




// User Signup
const userSignup = async (req, res) => {
    try {
        const { name, email, password, mobile, profilePic } = req.body;

        // Check for required fields
        if (!name || !email || !password || !mobile) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Create a new user
        const user = new User({ name, email, password: hashedPassword, mobile, profilePic });
        await user.save();

        // Generate token
        const token = generateToken(user._id, user.role);

        // Return success response
        res.status(201).json({ message: "User account created successfully", user, token });
    } catch (error) {
        res.status(500).json({ message: "Failed to create user account. Please try again later." });
    }
};

// User Login
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for required fields
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare passwords
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate token
        const token = generateToken(user._id, user.role);

        // Return success response
        res.status(200).json({ message: "Login successful", user, token });
    } catch (error) {
        res.status(500).json({ message: "Failed to login. Please try again later." });
    }
};

// Get User Profile
const getUserProfile = async (req, res) => {
    try {
        // Fetch user by ID
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return success response
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve user profile. Please try again later." });
    }
};

// User Logout
const userLogout = async (req, res) => {
    try {
        // Clear JWT token from cookies
        res.clearCookie('token');
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Failed to logout. Please try again later." });
    }
};
  
module.exports = {
    userSignup,
    userLogin,
    getUserProfile,
    userLogout
};