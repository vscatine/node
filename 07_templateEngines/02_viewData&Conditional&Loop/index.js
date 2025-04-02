const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/news', (req, res) => {
    res.render('news')
})

app.get('/dashboard', (req, res) => {
    const itemsDB = ['item 01', 'item 02', 'item03', 'item04']
    res.render('dashboard', {items : itemsDB})
})

app.get('/', (req, res) => {
    const userDB = {
        name : 'Vitor',
        surname: 'Scatine'
    }

    const auth = true
    
    res.render('home', {user : userDB, auth})
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})
