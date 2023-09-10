const Appointment = require('../models/appointments');

exports.scheduleAppointment = async (req, res) => {
    try {

        const appointment = new Appointment({
            title: req.body.title,
            agenda: req.body.agenda,
            date: req.body.date,
            time: req.body.time,
            recipient: req.body.recipient,
            scheduler: req.body.scheduler,
        });
        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to schedule appointment' });
    }
};