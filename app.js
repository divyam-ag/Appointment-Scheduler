const express = require('express');
const app = express();
const db = require('./app/models/db');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('./app/models/users');
require('dotenv').config();


const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
};

app.use(bodyParser.json());

console.log('Initializing Passport');
app.use(passport.initialize());

passport.use(new JwtStrategy(jwtOptions, (jwt_payload, done) => {

    User.findOne({ username: jwt_payload.username })
        .then(user => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch(error => {
            return done(error, false);
        });
}));

const appointmentRoutes = require('./app/routes/appointmentsRoutes');
const userRoutes = require('./app/routes/userRoutes');

app.use('/appointments', appointmentRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});