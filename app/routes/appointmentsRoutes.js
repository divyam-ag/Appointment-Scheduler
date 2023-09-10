const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/appointmentsController');


// Routes related to appointment scheduling
router.post('/schedule', AppointmentController.scheduleAppointment);

module.exports = router;