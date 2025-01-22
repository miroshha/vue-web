// routes/Auth.js
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user/User.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password, rememberMe } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User does not exists' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const tokenExpiry = rememberMe ? '7d' : '1h';
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: tokenExpiry });
        res.json({ token, _id: user._id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;