const express = require('express');
const { createBatch } = require('../controllers/batchController');  // Import the controller
const { getBatchesByCreatorId } = require('../controllers/getBatchesByCreatorId');  // Import the controller
const { getUserDetailsInSubBatch } = require('../controllers/getUserDetailsInSubBatch');  // Import the controller
const router = express.Router();

// Route to create a batch with sub-batches and creator
router.post('/create', createBatch);  // POST request to create batch

// Route to get all batches created by a specific user (creatorId)
router.get('/getBatches/:creatorId', getBatchesByCreatorId);  // GET request to fetch batches by creatorId

// Route to get user details (name, playerType) by user IDs in sub-batch
router.post('/getUserDetailsInSubBatch', getUserDetailsInSubBatch);  // POST request to fetch user details by user IDs

module.exports = router;
