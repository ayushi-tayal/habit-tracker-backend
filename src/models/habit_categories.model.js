const mongoose = require('mongoose');

const habitCategoriesSchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    displayOrder: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('HabitCategory', habitCategoriesSchema, 'habit_categories');