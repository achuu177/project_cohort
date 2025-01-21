const express = require("express");
const userRoutes = require("./userRoutes.js");
const productRoutes = require("./productRoutes.js");
const cartRoutes = require("./cartRoutes.js");
const wishlistRoutes = require("./wishlistRoutes.js");
const orderRoutes = require("./orderRoutes.js");
const paymentRoutes = require("./paymentRoutes.js");
const adminRoutes = require("./adminRoutes.js");
const sellerRoutes = require("./sellerRoutes.js");
const reviewRoutes = require("./reviewRoutes.js");
const searchRoutes = require("./searchRoutes.js");

const router = express.Router();

router.use('/users', userRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes); 
router.use("/wishlist", wishlistRoutes);
router.use("/orders", orderRoutes);
router.use("/payments", paymentRoutes);
router.use("/admin", adminRoutes);
router.use("/seller", sellerRoutes);
router.use("/reviews", reviewRoutes); 
router.use("/search", searchRoutes);  

module.exports = router ;