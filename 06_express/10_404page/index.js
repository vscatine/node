const express = require('express')
const path = require('path')

const app = express()
const port = 3000

const users = require('./users')

const pathBase = path.join(__dirname, 'templates')

//Configurações para o ler o body com express
app.use(express.urlencoded({
    extended: true
})
)
app.use(express.json())

//Arquivos estáticos
app.use(express.static('public'))

app.use('/users', users)

app.get('/', (req, res) => {
    res.sendFile(`${pathBase}/index.html`)
})

//Rota não encontrada - Return page 404
app.use((req, res, next) => {
    res.status(404).sendFile(`${pathBase}/404.html`)
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})
