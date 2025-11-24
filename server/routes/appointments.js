const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Appointment = require('../models/Appointment');

// @route   GET api/appointments
// @desc    Get all user's appointments
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const appointments = await Appointment.find({ user: req.user.id }).sort({ date: 1 });
        res.json(appointments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/appointments
// @desc    Add new appointment
// @access  Private
router.post('/', auth, async (req, res) => {
    const { clientName, date, location, product, productId, price, status } = req.body;

    console.log('=== POST /api/appointments ===');
    console.log('User ID:', req.user.id);
    console.log('Request body:', req.body);

    try {
        const newAppointment = new Appointment({
            clientName,
            date,
            location,
            product,
            productId,
            price,
            status,
            user: req.user.id
        });

        console.log('New appointment object:', newAppointment);
        const appointment = await newAppointment.save();
        console.log('Appointment saved successfully:', appointment);
        res.json(appointment);
    } catch (err) {
        console.error('Error saving appointment:', err.message);
        console.error('Full error:', err);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
});

// @route   DELETE api/appointments/:id
// @desc    Delete appointment
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let appointment = await Appointment.findById(req.params.id);

        if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });

        // Make sure user owns appointment
        if (appointment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Appointment.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Appointment removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
