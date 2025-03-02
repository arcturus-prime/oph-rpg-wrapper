var database = require('./Database')
var session = require('express-session');
var Sequelize = require('sequelize');
var SequelizeStore = require('connect-session-sequelize')(session.Store);

module.exports.init = async function () {
    module.exports.store = new SequelizeStore({
        db: database,
        tableName: 'Sessions'
    })
    module.exports.store.sync();
    module.exports.table = await database.define('Sessions', {
        sid: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        expires: Sequelize.DATE,
        data: Sequelize.STRING(50000)
    });
}

module.exports.getSessionByUsername = function (username) {
    return new Promise((resolve, reject) => {
        module.exports.table.findOne({
            where: {
                data: {
                    username: username
                }
            }
        }).then(session => {
            resolve(session);
        }).catch((err) => {
            reject(err);
        })
    })
}

module.exports.getAllSessions = function () {
    return new Promise((resolve, reject) => {
        module.exports.table.findAll().then(session => {
            resolve(session);
        }).catch((err) => {
            reject(err);
        })
    })
}

