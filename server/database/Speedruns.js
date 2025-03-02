var database = require('./Database');
var Sequelize = require('sequelize');

module.exports.init = async function() {
    module.exports.table = await database.define('Speedruns', {
        username: {
            type: Sequelize.STRING
        },
        gameVersion: {
            type: Sequelize.STRING
        },
        runTime: {
            type: Sequelize.STRING
        }
    });
    await module.exports.table.sync();
}

module.exports.getSpeedrunsByUsername = function(username) {
    return new Promise((resolve, reject) => {
        module.exports.table.findAll({
            where: {
                username: username
            }
        }).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports.getSpeedrunsByVersion = function(version) {
    return new Promise((resolve, reject) => {
        module.exports.table.findAll({
            where: {
                gameVersion: version
            }
        }).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports.getSpeedrunsByDate = function(date) {
    return new Promise((resolve, reject) => {
        module.exports.table.findAll({
            where: {
                createdAt: date
            }
        }).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports.getAllSpeedruns = function() {
    return new Promise((resolve, reject) => {
        module.exports.table.findAll().then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports.addSpeedrun = function(options) {
    return new Promise((resolve, reject) => {
        module.exports.table.create({
            username: options.username,
            gameVersion: options.gameVersion,
            runTime: options.runTime
        }).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        })
    });
}