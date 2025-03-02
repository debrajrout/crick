// routes/helloRoutes.js

const express = require('express');
const router = express.Router();
const helloController = require('../controllers/helloController');

// Route: GET /api/hello
router.get('/', helloController.getHello);

module.exports = router;
