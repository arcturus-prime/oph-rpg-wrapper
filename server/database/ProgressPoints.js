var database = require('./Database');
var Sequelize = require('sequelize');



module.exports.init = async function() {
    module.exports.table = await database.define('ProgressPoints', {
        name: {
            type: Sequelize.STRING
        },
        triggerFile: {
            type: Sequelize.STRING
        },
        special: {
            type: Sequelize.STRING
        }
    });
    await module.exports.table.sync();
}

module.exports.getPointByTriggerFile = function(triggerFile) {
    return new Promise((resolve, reject) => {
        module.exports.table.findOne({
            where: {
                triggerFile: triggerFile
            }
        }).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports.getPointByName = function(name) {
    return new Promise((resolve, reject) => {
        module.exports.table.findOne({
            where: {
                name: name
            }
        }).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports.getPointByID = function(id) {
    return new Promise((resolve, reject) => {
        module.exports.table.findOne({
            where: {
                id: id
            }
        }).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        })
    });
}