const express = require('express')
const router = express.Router()
const path = require('path')

const pathBase = path.join(__dirname, '../templates')

router.get('/noticias', (req, res) => {
    res.sendFile(`${pathBase}/sections/noticias.html`)
})

router.get('/futebol', (req, res) => {
    res.sendFile(`${pathBase}/sections/futebol.html`)
})

router.get('/entretenimento', (req, res) => {
    res.sendFile(`${pathBase}/sections/entretenimento.html`)
})

module.exports = router
