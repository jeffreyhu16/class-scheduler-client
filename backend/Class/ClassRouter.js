const express = require('express');
const router = require('../IndexRouter');
const classController = require('./ClassController');

router.use(express.json());
router.get('/', classController.getClasses);
router.post('/singleClass', classController.setSingleClass);

module.exports = router;