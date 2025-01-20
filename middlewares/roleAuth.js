const roleAuth = (requiredRole) => {
    return (req, res, next) => {
        try {
            const user = req.user; // Extract user from `userAuth` middleware

            if (!user || user.role !== requiredRole) {
                return res.status(403).json({ message: "Access denied", success: false });
            }

            next(); // Role matches, proceed to the next middleware/handler
        } catch (error) {
            return res.status(500).json({
                message: error.message || "Authorization failed",
                success: false,
            });
        }
    };
};

module.exports = { roleAuth };
