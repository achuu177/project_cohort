const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
    try {
        const { token } = req.cookies; // Token extracted from cookies

        if (!token) {
            return res.status(401).json({ message: "User not authorized", success: false });
        }

        const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verifying the token

        if (!tokenVerified) {
            return res.status(401).json({ message: "User not authorized", success: false });
        }

        req.user = tokenVerified; // Attach user data to request

        next();
    } catch (error) {
        return res.status(401).json({
            message: error.message || "User authorization failed",
            success: false,
        });
    }
};

module.exports = { userAuth };
