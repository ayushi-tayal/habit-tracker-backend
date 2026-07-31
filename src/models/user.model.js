const mongoose = require('mongoose');

const address = new mongoose.Schema({
    _id: false,
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

const personalInfo = new mongoose.Schema({
    _id:false,
    profession: {
        type: String,
    },
    marital_status: {
        type: String,
    },
    address: address
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    personal_info: personalInfo
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);