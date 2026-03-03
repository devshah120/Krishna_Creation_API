const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');

// Get all inquiries (Admin)
router.get('/', async (req, res) => {
    try {
        const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create inquiry
router.post('/', async (req, res) => {
    try {
        const inquiry = new Inquiry(req.body);
        await inquiry.save();
        res.status(201).json(inquiry);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update inquiry
router.put('/:id', async (req, res) => {
    try {
        const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(inquiry);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete inquiry
router.delete('/:id', async (req, res) => {
    try {
        await Inquiry.findByIdAndDelete(req.params.id);
        res.json({ message: 'Inquiry deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
