const express = require('express')
const path = require('path')

const app = express()
const port = 3000

const pathBase = path.join(__dirname, 'templates')

app.use(express.urlencoded({
    extended: true
})
)

app.use(express.json())

app.get('/users/add', (req, res) => {
    res.sendFile(`${pathBase}/userAdd.html`)
})

app.post('/users/save', (req, res) => {
    console.log(req.body)
    const usrName = req.body.name
    const usrAge = req.body.age

    console.log(`O nome do usuário é ${usrName} e sua idade é ${usrAge} anos.`)

    res.sendFile(`${pathBase}/userAdd200.html`)
})

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
