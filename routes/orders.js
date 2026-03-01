const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Get all orders (Admin) or assigned orders (Worker)
router.get('/', async (req, res) => {
    try {
        const { role, userId } = req.query; // For simplicity, using query params. In production, use JWT middleware.
        let query = {};
        if (role === 'Worker') {
            query.assignedWorkerId = userId;
        }
        const orders = await Order.find(query).populate('assignedWorkerId', 'name');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create order (Admin)
router.post('/', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update order status/details
router.put('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
