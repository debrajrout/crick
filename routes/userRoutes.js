const express = require('express');
const { createUser } = require('../controllers/userController');
const { getUserByFirebaseUid } = require('../controllers/getUserController');
const { markAttendance } = require('../controllers/attendanceController');
const { updateUserInfo } = require('../controllers/updateInformation');
const { createBatch } = require('../controllers/batchController');

const router = express.Router();

// POST: Create a new user
router.post('/createUser', createUser);

// GET: Get a user by Firebase UID
router.get('/user/:firebaseUid', getUserByFirebaseUid);

// POST: Mark attendance
router.post('/markAttendance', markAttendance);

// PUT: Update user information
router.put('/updateUser', updateUserInfo);

// POST: Create a new batch with sub-batches
router.post('/createBatch', createBatch);  // New route for creating a batch

module.exports = router;
