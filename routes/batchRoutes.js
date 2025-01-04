// routes/batchRoutes.js

const express = require('express');
const { createBatch } = require('../controllers/batchController');  // Import the controller
const router = express.Router();

// Route to create a batch with sub-batches
router.post('/create', createBatch);

module.exports = router;
