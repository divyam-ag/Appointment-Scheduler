const express = require('express');
const app = express();
const db = require('./app/models/db');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const appointmentRoutes = require('./app/routes/appointmentsRoutes');

app.use('/appointments', appointmentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});