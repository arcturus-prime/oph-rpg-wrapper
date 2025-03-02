var express = require('express');
var router = express.Router();

router.use('/', require('./SpeedrunFileHooks'));
router.use('/speedrun/account', require('./SpeedrunAccount'));
router.use('/speedrun/data', require('./SpeedrunData'));

module.exports = router;