const express = require('express');
const router = express.Router();
const dateController = require('./DateController');

router.get('/currentDate', dateController.getCurrentDate);
router.get('/startOfWeek', dateController.getStartOfWeek);
router.get('/fullWeek', dateController.getFullWeek);

module.exports = router;