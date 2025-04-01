const express = require('express')
const path = require('path')

const port = 3000
const app = express()

const pathBase = path.join(__dirname, 'templates')

app.get('/', (req, res) => {
    res.sendFile(`${pathBase}/index.html`, err => {
        if (err) console.log(err)
        })
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})
