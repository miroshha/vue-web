import express from 'express';
import User from '../models/user/User.js';
import bcrypt from 'bcryptjs';
import getUser from '../middlewares/getUser.js'
import LoginMiddleware from '../middlewares/Login.js'
import authentication from '../middlewares/Authentication.js'

const router = express.Router();

// Get all users
router.get('/', authentication, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new user
router.post('/', authentication, async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get user by id
router.get('/:id', authentication, getUser, LoginMiddleware, (req, res) => {
    res.json(res.user);
});

// Update user
router.patch('/:id', authentication, getUser, LoginMiddleware, async (req, res) => {
    const { name, email, password } = req.body;
    if (name != null) res.user.name = name;
    if (email != null) res.user.email = email;
    if (password != null) res.user.password = password;
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete user by id
router.delete('/:id', authentication, getUser, LoginMiddleware, async (req, res) => {
    try {
        await User.deleteOne({ _id: res.user._id });
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;