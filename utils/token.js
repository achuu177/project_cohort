 const jwt = require('jsonwebtoken');

const generateToken = (id, role = "user") => {
    try {
        const token = jwt.sign({ id, role }, process.env.JWT_SECRET_KEY);
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        return null;
    }
};

module.exports = { generateToken };
