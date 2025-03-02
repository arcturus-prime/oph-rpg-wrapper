var crypto = require('crypto');


module.exports.hashPassword = function (options) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(options.password, options.salt, 1000, 64, 'sha512', (err, derivedKey) => {
            if (err) {
                reject(err);
            }
            resolve(derivedKey);
        })
    })
}
module.exports.generateSalt = function (options) {
    return new Promise((resolve, reject) => {
        let salt;
        try {
            salt = crypto.randomBytes(options.length).toString('hex');
        } catch (err) {
            reject(err);
        }
        resolve(salt);
    })
}

