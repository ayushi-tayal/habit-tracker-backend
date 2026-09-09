const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    category_id: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    display_order: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Habit', habitSchema);