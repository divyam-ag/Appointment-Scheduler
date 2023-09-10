const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    offHours: [{
        start: { type: String, required: true },
        end: { type: String, required: true }
    }]


});

userSchema.set('default', { offHours: [] });
const User = mongoose.model('User', userSchema);

module.exports = User;