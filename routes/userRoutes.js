const express = require('express');
const { createUser } = require('../controllers/userController');
const { getUserByFirebaseUid } = require('../controllers/getUserController');
const { markAttendance } = require('../controllers/attendanceController');

const router = express.Router();

// POST: Create a new user
router.post('/createUser', createUser);
router.get('/user/:firebaseUid', getUserByFirebaseUid);
router.post('/markAttendance', markAttendance);

module.exports = router;
