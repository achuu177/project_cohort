const jwt = require("jsonwebtoken");

const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        try {
            const { token } = req.cookies;

            if (!token) {
                return res.status(401).json({ message: "User not authorized", success: false });
            }

            const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);

            if (!tokenVerified) {
                return res.status(401).json({ message: "User not authorized", success: false });
            }

            if (roles.length && !roles.includes(tokenVerified.role)) {
                return res.status(403).json({ message: "Access denied", success: false });
            }

            req.user = tokenVerified; // Attach user info
            next();
        } catch (error) {
            return res.status(401).json({
                message: error.message || "Authentication failed",
                success: false,
            });
        }
    };
};

module.exports = { authMiddleware };
