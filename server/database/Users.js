var database = require('./Database');
var Sequelize = require('sequelize');

module.exports.init = async function () {
    module.exports.table = await database.define('Users', {
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        passwordSalt: {
            type: Sequelize.STRING
        }
    });
    await module.exports.table.sync();
}
module.exports.getUserByUsername = function (username) {
    return new Promise((resolve, reject) => {
        module.exports.table.findOne({
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

module.exports.addUser = function (username, password, passwordSalt) {
    return new Promise((resolve, reject) => {
        module.exports.table.create(
            {
                username: username,
                password: password,
                passwordSalt: passwordSalt
            }
        ).then(() => {
            resolve();
        }).catch((err) => {
            reject(err);
        })
    });
}
module.exports.editUser = function (options1, options2) {
    return new Promise((resolve, reject) => {
        this.table.update({
            username: options2.username,
            password: options2.password,
            passwordSalt: options2.passwordSalt
        }, {
            where: {
                username: options1.username
            }
        }).then(() => {
            resolve();
        }).catch((err) => {
            reject(err);
        })
    });
}

