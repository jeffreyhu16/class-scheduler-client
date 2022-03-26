const express = require('express');
const router = express.Router();
const classController = require('./ClassController');

router.get('/classes', classController.getClasses);
router.post('/', classController.setClass);
router.post('/copy', classController.copyClasses);
router.put('/', classController.updateClass);
router.delete('/', classController.deleteClass);

module.exports = router;