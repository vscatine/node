const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 5000

const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

const currency = 'R$'
const productsArray = [
    {
        title:      'Guitarra Gibson Les Paul 1959',
        id:         'g01',
        category:   'guitarra',
        value:      '5999,99'
    },
    {
        title:      'Guitarra Fender Stratocaster 1978',
        id:         'g02',
        category:   'guitarra',
        value:      '4855,99'
    },
    {
        title:      'Guitarra Epiphone SG 1988',
        id:         'g03',
        category:   'guitarra',
        value:      '5555.99'
    }
]

app.get('/product/:id', (req, res) => {
    const product = productsArray.find(product => product.id === req.params.id)
    console.log((product))
    res.render('product', {product, currency})
})

app.get('/', (req, res) => {
    res.render('home', {productsArray, currency})
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})
