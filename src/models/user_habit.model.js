const mongoose = require('mongoose');

const userHabitSchema = new mongoose.Schema({
    habitIds: {
        type: [],
        required: true,
        trim: true
    },
    userId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('UserHabit', userHabitSchema);