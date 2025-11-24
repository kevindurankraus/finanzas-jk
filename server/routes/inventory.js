const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Inventory = require('../models/Inventory');

// @route   GET api/inventory
// @desc    Get all user's inventory items
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const items = await Inventory.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/inventory
// @desc    Add new inventory item
// @access  Private
router.post('/', auth, async (req, res) => {
    const { name, quantity, unitType, price } = req.body;

    try {
        const newItem = new Inventory({
            name,
            quantity,
            unitType,
            price,
            user: req.user.id
        });

        const item = await newItem.save();
        res.json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/inventory/:id
// @desc    Update inventory item
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { name, quantity, unitType, price } = req.body;

    try {
        let item = await Inventory.findById(req.params.id);

        if (!item) return res.status(404).json({ msg: 'Item not found' });

        // Make sure user owns item
        if (item.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        item = await Inventory.findByIdAndUpdate(
            req.params.id,
            { $set: { name, quantity, unitType, price } },
            { new: true }
        );

        res.json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/inventory/:id
// @desc    Delete inventory item
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let item = await Inventory.findById(req.params.id);

        if (!item) return res.status(404).json({ msg: 'Item not found' });

        // Make sure user owns item
        if (item.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Inventory.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Item removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
