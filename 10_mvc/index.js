const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
const conn = require('./db/conn')

const Task = require('./models/Task')
const tasksRoutes = require('./routes/tasksRoutes')


app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//Configurações para ler o body em JSON
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.use(express.static('public'))


//ROUTES USE - Define nome rota que será usada na URL
app.use('/tasks', tasksRoutes)

conn
    .sync()
    .then(
        app.listen(port, () => {
            console.log(`App rodando na porta ${port}`)
        })
    )
    .catch((err) => console.log(err))

