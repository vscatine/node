const e = require('express')
const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const User = require('./models/User')

const app = express()
const port = 3000

//configurações para ler o body em JSON
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/users/create', (req, res) => {
    res.render('usercreate')
})

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/user/create', async (req, res) => {
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter
    
    !newsletter? newsletter = false : newsletter = true

    await User.create({name, occupation, newsletter})
   
    res.redirect('/')
})

conn.sync()
    .then(
        app.listen(port, () => {
            console.log(`App rodando na porta ${port}`)
        })
    )
    .catch((err) => console.log(err))
