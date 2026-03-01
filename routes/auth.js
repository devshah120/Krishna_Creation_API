const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register (for initial setup or admin use)
router.post('/register', async (req, res) => {
    try {
        const { name, username, password, role } = req.body;
        const user = new User({ name, username: username.toLowerCase(), password, role });
        await user.save();
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(`Login attempt for username: ${username}`);

        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is missing in environment variables!');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        const user = await User.findOne({ username: username.toLowerCase() });
        if (!user) {
            console.log(`User not found: ${username}`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            console.log(`Password mismatch for user: ${username}`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        console.log(`Login successful for user: ${username}`);
        res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Get all workers
router.get('/workers', async (req, res) => {
    try {
        const workers = await User.find({ role: 'Worker' }).select('-password');
        res.json(workers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
