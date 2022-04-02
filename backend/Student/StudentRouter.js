const express = require('express');
const router = express.Router();
const studentController = require('./StudentController');

router.get('/options', studentController.getStudentOptions);

module.exports = router;