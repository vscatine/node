const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/blog', (req, res) => {
    const postsDB = [
        {
            title: 'Javascript, aprenda o básico',
            category: 'JavaScript'
        },
        {
            title: 'Python, aprenda o básico',
            category: 'Python'
        },
        {
            title: 'PHP, aprenda o básico',
            category: 'PHP'
        }
    ]

    res.render('blog', {postsDB})
})

app.get('/news', (req, res) => {
    const newsBD = {
        title: 'Node é o backend do JavaScript?',
        category: 'development',
        body: 'Esse é o corpo do meu artigo que explica se Node pode ser considerado o backend do JavaScript.'
    }
    res.render('news', {post : newsBD})
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
