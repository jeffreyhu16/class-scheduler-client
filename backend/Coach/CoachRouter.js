const express = require('express');
const router = express.Router();
const coachController = require('./CoachController');

router.get('/', coachController.getCoaches);

module.exports = router;