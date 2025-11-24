const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Transaction = require('../models/Transaction');

// @route   GET api/transactions
// @desc    Get all users transactions
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
        res.json(transactions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/transactions
// @desc    Add new transaction
// @access  Private
router.post('/', auth, async (req, res) => {
    const { type, amount, category, description, date } = req.body;

    try {
        const newTransaction = new Transaction({
            type,
            amount,
            category,
            description,
            date,
            user: req.user.id
        });

        const transaction = await newTransaction.save();
        res.json(transaction);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/transactions/:id
// @desc    Delete transaction
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let transaction = await Transaction.findById(req.params.id);

        if (!transaction) return res.status(404).json({ msg: 'Transaction not found' });

        // Make sure user owns transaction
        if (transaction.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Transaction.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Transaction removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
