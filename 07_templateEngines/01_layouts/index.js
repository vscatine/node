const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/news', (req, res) => {
    res.render('news')
})

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})
