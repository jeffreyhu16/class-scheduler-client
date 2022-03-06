const express = require('express');
const router = require('../IndexRouter');
const classController = require('./ClassController');

router.use(express.json());
router.post('/singleClass', classController.postSingleClass);

module.exports = router;