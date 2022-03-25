const express = require('express');
const router = express.Router();
const classController = require('./ClassController');

router.get('/classes', classController.getClasses);
router.get('/weekClasses', classController.getWeekClasses);
router.post('/', classController.setClass);
router.post('/classes', classController.setClasses);
router.put('/', classController.updateClass);
router.delete('/', classController.deleteClass);

module.exports = router;