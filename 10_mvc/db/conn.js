const { Sequelize } = require("sequelize")

const sequelize = new Sequelize('nodemvc2', 'root', 'password', {
    host: '127.0.0.1',
    dialect: "mysql"
})

try {
    sequelize.authenticate()
    console.log('Conectado ao MySQL!')
} catch(err) {
    console.log(`Não foi possível conectar: ${err}`)
}

module.exports = sequelize
