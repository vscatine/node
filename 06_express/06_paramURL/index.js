const express = require('express')
const path = require('path')

const app = express()
const port = 3000

const pathBase = path.join(__dirname, 'templates')

app.get('/users/:id', (req, res) => {
    const id = req.params.id
    console.log(`Buscando pelo usuário ${id}`)
    res.sendFile(`${pathBase}/users.html`)
})

app.get('/', (req, res) => {
    res.sendFile(`${pathBase}/index.html`)
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})
