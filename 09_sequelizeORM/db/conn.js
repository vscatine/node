const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodesequelize2', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
})


module.exports = sequelize
