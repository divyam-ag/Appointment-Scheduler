const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    scheduler: {
        type: String,
        required: true,
    },
    recipient: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    agenda: {
        type: String,
        required: true,
    },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;