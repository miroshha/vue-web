import jwt from 'jsonwebtoken';

// middleware to find user by id
import User from '../models/user/User.js'
async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    const authHeader = req.header('User-Token');
    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied, token required' });
    }
    const token = authHeader.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access denied, token required' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.id !== req.params.id) {
            return res.status(403).json({ message: 'Access denied: unauthorized to access this user\'s data' });
        }

        res.user = user;
        next();
    } catch (e) {
        if (e.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired. Please log in again.' });
        }
        if (e.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        console.error('JWT Error:', e);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export default getUser;