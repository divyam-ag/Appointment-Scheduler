const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


/**
    @req gets the request from login route
    @description logs in the user if an existing account exists
    @res returns the unique authentication token
*/

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(passwordMatch);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' }); // Change the secret key and expiration as needed

        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        console.error(`Error logging in user: ${error}`);
        res.status(500).json({ message: 'Failed to Login user' });
    }
};

/**
    @req gets the request from signup route
    @description signs up a new user if an existing account doesnt exist
*/

exports.signup = async (req, res) => {

    try {

        const { username, email, password, name } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            name
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to Login user' });
    }

};

/**
    @req gets the request from updateProfile route
    @description updates the profile of the user on the basis of the entered data.
*/

exports.updateProfile = async (req, res) => {
    try {
        const { name, password, offHours } = req.body;
        const userName = req.user.username;
        const user = await User.findOne({ username: userName });

        if (name) {
            user.name = name;
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        if (offHours) {
            user.offHours = offHours;
        }

        await user.save();

        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
