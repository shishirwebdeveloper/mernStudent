const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;



    if (!token) {
        return res.status(401).json({ status: 401, message: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ status: 400, message: 'Invalid token' });
    }
}

module.exports = authMiddleware;