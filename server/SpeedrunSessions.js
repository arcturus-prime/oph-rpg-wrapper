var express = require('express');
var session = require('express-session');
var config = require('./config.json');
var Sessions = require('./database/Sessions')
var Users = require('./database/Users');
var ProgressPoints = require('./database/ProgressPoints');
var Speedruns = require('./database/Speedruns');
Sessions.init();
Users.init();
ProgressPoints.init();
Speedruns.init();

var router = express.Router();
router.use(session({
    secret: 'OpheliousHasCookies',
    store: Sessions.store,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 5000000
    }
}))

module.exports = router;