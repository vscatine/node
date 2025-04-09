const express   = require('express')
const exphbs    = require('express-handlebars')
const conn      = require('./db/conn')

const User      = require('./models/User')
const Address   = require('./models/Address')

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
app.post('/users/create', async (req, res) => {
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

/* UPDATE */
app.get('/users/edit/:id', async (req, res) => {
    const idReq = req.params.id
    const user = await User.findOne({
        //Removendo raw = true para pegar endereços vinculados
        //raw :   true, 
        include: Address,
        where : {
            id: idReq
        }
    })
    res.render('useredit', { user: user.get({plain : true}) })
})

app.post('/users/edit/:id', async (req, res) => {
    const idReq     = req.body.id
    const nameReq   = req.body.name
    const occupReq  = req.body.occupation
    let   newsReq   = req.body.newsletter
    
    !newsReq? newsReq = false : newsReq = true

    await User.update({
        name:       nameReq,
        occupation: occupReq,
        newsletter: newsReq
    },
    {
        where: {
            id: idReq
        }
    })

    res.redirect('/')
})

app.post('/address/create/:id', async (req, res) => {
    const userId = req.body.userId
    const street = req.body.street
    const number = req.body.number
    const city = req.body.city

    const adressData = {
        userId,
        street,
        number,
        city
    }

    await Address.create(adressData)

    res.redirect(`/users/edit/${userId}`)
})

app.post('/address/delete/:id', async (req, res) => {
    const addressId = req.body.id
    const userId = req.body.userId

    await Address.destroy({
        where: {
            id: addressId
        }
    })
    

    res.redirect(`/users/edit/${userId}`)
})

conn
    //Drop na tabela e recria
    //.sync({ force : true })
    .sync()
        .then(
            app.listen(port, () => {
                console.log(`App rodando na porta ${port}`)
            })
        )
        .catch((err) => console.log(err))
