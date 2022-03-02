const router = require('../IndexRouter');
const dateController = require('./DateController');

router.get('/getFullWeek', dateController.getFullWeek);

module.exports = router;