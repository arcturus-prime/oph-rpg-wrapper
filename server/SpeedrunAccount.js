var express = require('express');
var HashingTool = require('./helpers/HashingTool');
var session = require('express-session');
var Sessions = require('./database/Sessions')
var Users = require('./database/Users');
Sessions.init();
Users.init();

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

router.post('/login', async function(req, res, next) {
    let userExists = await Users.getUserByUsername(req.body.username) !== null;
    if (userExists) {
        let user = await Users.getUserByUsername(req.body.username);
        let salt = user.dataValues.passwordSalt;
        let realHash = user.dataValues.password;
        let enteredHash = await HashingTool.hashPassword({
            password: req.body.password,
            salt: salt
        });
        if (realHash.toString() === enteredHash.toString()) {
            req.session.username = req.body.username;
            res.send('{ "status": "success", "error": "" }');
        } else if (realHash.toString() !== enteredHash.toString()) {
            res.send('{ "status": "failure", "error": "Incorrect username or password" }');
        }
    } else if (!userExists) {
        res.send('{ "status": "failure", "error": "Incorrect username or password" }');
    }
})

router.post('/register', async function(req, res, next) {
    let userExists = await Users.getUserByUsername(req.body.username) !== null;
    if (!userExists) {
        let salt = await HashingTool.generateSalt({ length: 16 });
        let hash = await HashingTool.hashPassword({
            password: req.body.password,
            salt: salt
        });
        await Users.addUser(req.body.username, hash, salt);
        res.send('{ "status": "success", "error": "" }');
    } else if (userExists) {
        res.send('{ "status": "failure", "error": "User already exists" }');
    }
})

module.exports = router;