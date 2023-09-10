const Appointment = require('../models/appointments');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const { isTimeSlotWithinOffHours } = require('../utils/checkAvailableHours');
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


        const { title, agenda, startTime, endTime, guestName, guestId, schedulerName, schedulerId } = req.body;

        const scheduler = await User.findOne({ username: schedulerId });
        let schedulerBookedHours = [];
        let guestBookedHours = [];

        if (scheduler) {

            if (scheduler.offHours.length > 0) {
                if (isTimeSlotWithinOffHours(startTime, endTime, scheduler.offHours)) {
                    return res.status(400).json({ error: 'Requested time is within off-hours of the scheduler' });
                }
            }

            if (scheduler.bookedHours.length > 0) {
                if (isTimeSlotWithinOffHours(startTime, endTime, scheduler.bookedHours)) {
                    return res.status(400).json({ error: 'Requested time is within booked-hours of the scheduler' });
                }
                schedulerBookedHours = scheduler.bookedHours
            }

        }

        const guest = await User.findOne({ username: guestId });

        if (guest) {

            if (guest.offHours.length > 0) {
                if (isTimeSlotWithinOffHours(startTime, endTime, guest.offHours)) {
                    return res.status(400).json({ error: 'Requested time is within off-hours of the guest' });
                }
            }

            if (guest.bookedHours.length > 0) {
                if (isTimeSlotWithinOffHours(startTime, endTime, guest.bookedHours)) {
                    return res.status(400).json({ error: 'Requested time is within booked-hours of the guest' });
                }
                guestBookedHours = guest.bookedHours;
            }

        }

        const appointment = new Appointment({
            title,
            agenda,
            startTime,
            endTime,
            guestName,
            guestId,
            schedulerName,
            schedulerId,
        });

        await appointment.save();

        schedulerBookedHours.push({ start: startTime, end: endTime });
        guestBookedHours.push({ start: startTime, end: endTime });

        await User.findOneAndUpdate({ username: schedulerId }, { bookedHours: schedulerBookedHours });
        await User.findOneAndUpdate({ username: guestId }, { bookedHours: guestBookedHours });

        res.status(201).json(appointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to schedule appointment' });
    }
};

exports.upcomingAppointments = async (req, res) => {

    const userId = req.user.username;
    console.log(userId);

    try {

        const currentDate = new Date();

        const upcomingAppointments = await Appointment.find({
            $or: [
                { schedulerId: userId },
                { guestId: userId }
            ],
            $and: [{ startTime: { $exists: true } }, { startTime: { $gte: new Date() } }]
        });
        console.log(upcomingAppointments);

        res.status(200).json(upcomingAppointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching upcoming appointments.' });
    }
}