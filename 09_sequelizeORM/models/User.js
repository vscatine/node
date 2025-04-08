const { DataTypes, BOOLEAN } = require('sequelize')

const db = require('../db/conn')

const User = db.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    occupation: {
        type: DataTypes.STRING,
        require: true
    },
    newsletter: {
        type: BOOLEAN
    }
})

module.exports = User
