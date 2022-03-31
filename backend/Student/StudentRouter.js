const express = require('express');
const router = express.Router();
const studentController = require('./StudentController');

router.get('/', studentController.getStudents);

module.exports = router;