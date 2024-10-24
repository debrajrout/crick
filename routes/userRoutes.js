const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// Route to verify OTP and register user
router.post('/register', registerUser);

// Route to verify OTP and login user
router.post('/login', loginUser);

module.exports = router;
