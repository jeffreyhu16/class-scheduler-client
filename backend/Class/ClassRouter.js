const router = require('../IndexRouter');
const classController = require('./ClassController');

router.post('/singleClass', classController.postSingleForm);

module.exports = router;