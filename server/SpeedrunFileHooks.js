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


router.get('/static/OpheliousChallenge/www/img/pictures/:triggerfile', async function(req, res, next) {
    let progressPoint = await ProgressPoints.getPointByTriggerFile(req.params.triggerfile);
    if (progressPoint !== null && req.session.username !== undefined) {
        if (req.session.timeAt === undefined) {
            req.session.timeAt = {};
        }
        req.session.currentPoint = progressPoint.dataValues.name;
        req.session.timeAt[progressPoint.dataValues.name] = Date.now();
        if (progressPoint.dataValues.special === "START") {
            req.session.startTime = req.session.timeAt[progressPoint.dataValues.name];
        }
        if (progressPoint.dataValues.special === "STOP") {
            req.session.stopTime = req.session.timeAt[progressPoint.dataValues.name];
            let calcruntime = req.session.stopTime - req.session.startTime
            await Speedruns.addSpeedrun({
                username: req.session.username,
                gameVersion: config.currentGameVersion,
                runTime: calcruntime
            });
            req.session.destroy();
        }
    }
    next();
})

module.exports = router;