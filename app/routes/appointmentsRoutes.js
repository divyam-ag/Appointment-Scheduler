const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/appointmentsController');
const passport = require('passport');

// Routes related to appointment scheduling
router.post('/schedule', passport.authenticate('jwt', { session: false }), AppointmentController.scheduleAppointment);
module.exports = router;