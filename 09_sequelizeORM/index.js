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

/* Select ALL */
app.get('/', async (req, res) => {
    const users = await User.findAll({raw:true})
    res.render('home', {users : users})
})

/* Insert*/
app.post('/user/create', async (req, res) => {
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter
    
    !newsletter? newsletter = false : newsletter = true

    await User.create({name, occupation, newsletter})
   
    res.redirect('/')
})

/* SELECT WHERE */ 
app.get('/users/:id', async (req, res) => {
    const idReq = req.params.id
    const user = await User.findOne({ raw : true, where: {id : idReq} })
    console.log(user)
    res.render('userview', {user})
})

/* DELETE */
app.post('/users/delete/:id', async (req, res) => {
    reqId = req.params.id
    await User.destroy({
        where: {
            id: reqId
        }
    })
    res.redirect('/')
})

conn.sync()
    .then(
        app.listen(port, () => {
            console.log(`App rodando na porta ${port}`)
        })
    )
    .catch((err) => console.log(err))
