const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const passport = require('passport');

// Routes related to users
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.put('/profile/update', passport.authenticate('jwt', { session: false }), UserController.updateProfile);

module.exports = router;