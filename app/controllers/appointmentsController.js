const Appointment = require('../models/appointments');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

exports.scheduleAppointment = async (req, res) => {
    try {

        const token = req.headers.authorization.split(' ')[1];

        const decodedToken = jwt.verify(token, secretKey);

        const username = decodedToken.username;

        if (username != req.body.schedulerId) {

            throw new Error(`Unauthorized User`)
        };


        const appointment = new Appointment({
            title: req.body.title,
            agenda: req.body.agenda,
            date: req.body.date,
            time: req.body.time,
            guestName: req.body.guest,
            guestId: req.body.guestId,
            schedulerName: req.body.scheduler,
            schedulerId: req.body.schedulerId,
        });

        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to schedule appointment' });
    }
};