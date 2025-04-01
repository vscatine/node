const express = require('express')
const router = express.Router()
const path = require('path')

const pathBase = path.join(__dirname, '../templates')

router.get('/add', (req, res) => {
    res.sendFile(`${pathBase}/userAdd.html`)
})

router.post('/save', (req, res) => {
    console.log(req.body)
    const usrName = req.body.name
    const usrAge = req.body.age
    console.log(`O nome do usuário é ${usrName} e sua idade é ${usrAge} anos.`)
    res.sendFile(`${pathBase}/userAdd200.html`)
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    console.log(`Buscando pelo usuário ${id}`)
    res.sendFile(`${pathBase}/users.html`)
})

module.exports = router
