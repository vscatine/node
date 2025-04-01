const express = require('express')
const path = require('path')

const app = express()
const port = 3000

const pathBase = path.join(__dirname, 'templates')

const checkAuth = (req, res, next) => {
    req.authStatus = true

    if (req.authStatus) {
        console.log(`Usuário logado. Pode continuar.`)
        next()
    } else {
        console.log(`Usuário não está logado! Faça login para continuar.`)
        next()
    }
}

app.use(checkAuth)

app.get('/', (req, res) => {
    res.sendFile(`${pathBase}/index.html`)
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})
