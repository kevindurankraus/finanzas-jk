const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    unitType: {
        type: String,
        enum: ['kg', 'unit', 'liter'],
        default: 'unit'
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Inventory', InventorySchema);
