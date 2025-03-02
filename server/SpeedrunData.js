var express = require('express');
var session = require('express-session');
var Sessions = require('./database/Sessions')
var Speedruns = require('./database/Speedruns')
var Users = require('./database/Users');
var ProgressPoints = require('./database/ProgressPoints');
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

router.get('/live', async function(req, res, next) {
    let sessions = await Sessions.getAllSessions()
    let liveruns = [];
    let dataobject = {};
    sessions.forEach(element => {
        let data = JSON.parse(element.dataValues.data);
        let liverun = {};
        liverun.username = data.username;
        liverun.currentPoint = data.currentPoint;
        liverun.startTime = data.startTime;
        liverun.timeAt = data.timeAt;
        if (data.currentPoint !== undefined) {
            liveruns.push(liverun);
        }
    });
    dataobject.liveruns = liveruns;
    res.send(JSON.stringify(dataobject));
})

function speedrunManipulate(speedruns) {
    var dataobject = {};
    let runs = [];
    speedruns.forEach(element => {
        let run = {};
        run.username = element.dataValues.username;
        run.gameVersion = element.dataValues.gameVersion;
        run.runTime = element.dataValues.runTime;
        run.date = element.dataValues.createdAt;
        runs.push(run);
    });
    dataobject.speedruns = runs;
    return JSON.stringify(dataobject);
}

router.get('/user/:username', async function(req, res, next) {
    let speedruns = await Speedruns.getSpeedrunsByUsername(req.params.username);
    res.send(speedrunManipulate(speedruns));
})

router.get('/version/:version', async function(req, res, next) {
    let speedruns = await Speedruns.getSpeedrunsByVersion(req.params.version);
    res.send(speedrunManipulate(speedruns));
})

router.get('/date/:date', async function(req, res, next) {
    let speedruns = await Speedruns.getSpeedrunsByDate(req.params.date);
    res.send(speedrunManipulate(speedruns));
})

router.get('/all', async function(req, res, next) {
    let speedruns = await Speedruns.getAllSpeedruns();
    res.send(speedrunManipulate(speedruns));
})

module.exports = router;