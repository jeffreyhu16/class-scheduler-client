const express = require('express');
const router = express.Router();
const locationController = require('./LocationController');

router.get('/', locationController.getLocations);

module.exports = router;