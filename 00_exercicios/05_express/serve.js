const express = require('express')
const path = require('path')
const app = express()
const port = 5000
const pathBase = path.join(__dirname, '/templates')

//rotas
const sections = require('./sections')

//Arquivos estáticos
app.use(express.static('public'))

app.use('/secao', sections)

app.get('/', (req, res) => {
    res.sendFile(`${pathBase}/home.html`)
})

app.use((req, res, next) => {
    res.status(404).sendFile(`${pathBase}/404.html`)
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})
