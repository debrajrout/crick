const express = require('express');
const { createUser } = require('../controllers/userController');
const { getUserByFirebaseUid } = require('../controllers/getUserController');
const { getUserById } = require('../controllers/getUserById');  // Added the getUserById controller
const { markAttendance } = require('../controllers/attendanceController');
const { updateUserInfo } = require('../controllers/updateInformation');
const { createBatch } = require('../controllers/batchController');
const { getBatchesByCreatorId } = require('../controllers/getBatchesByCreatorId');
const { getUserDetailsInSubBatch } = require('../controllers/getUserDetailsInSubBatch');  // Import the getUserDetailsInSubBatch controller

const router = express.Router();

// POST: Create a new user
router.post('/createUser', createUser);

// GET: Get a user by Firebase UID
router.get('/user/:firebaseUid', getUserByFirebaseUid);

// GET: Get a user by _id
router.get('/userById/:id', getUserById);  // Added route to fetch user by _id

// POST: Get user details (name, playerType) by user IDs in sub-batch
router.post('/getUserDetailsInSubBatch', getUserDetailsInSubBatch);  // New route for getting user details by user IDs

// POST: Mark attendance
router.post('/markAttendance', markAttendance);

// PUT: Update user information
router.put('/updateUser', updateUserInfo);

// POST: Create a new batch with sub-batches
router.post('/createBatch', createBatch);

// GET: Get all batches created by a specific user (creatorId)
router.get('/getBatches/:creatorId', getBatchesByCreatorId);

module.exports = router;
