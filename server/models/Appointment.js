const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String
    },
    product: {
        type: String,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory'
    },
    price: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
