const express = require('express');
const router = express.Router();
const dateController = require('../Date/DateController');

router.get('/getFullWeek', dateController.getFullWeek);


module.exports = router;