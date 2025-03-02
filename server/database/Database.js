const Sequelize = require('sequelize');

module.exports = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: 'data.sqlite'
})
