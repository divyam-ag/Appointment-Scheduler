const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    schedulerName: {
        type: String,
        required: true,
    },
    guestName: {
        type: String,
        required: true,
    },
    schedulerId: {
        type: String,
        required: true,
    },
    guestId: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
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