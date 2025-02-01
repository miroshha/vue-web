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
    try {

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