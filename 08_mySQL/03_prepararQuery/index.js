const e = require('express')
const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')

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

//DELETE  GET
app.get('/books/delete/:id', (req, res) => {
    const id = req.params.id

    const sql = `DELETE FROM books WHERE ?? = ?`
    const sqlData = ['id', id]

    pool.query(sql, sqlData, (err, result) => {
        if (err) console.log(err)
        res.redirect('/books')
    })
})

//DELETE POST
app.post('/books/delete/:id', (req, res) => {
    const id = req.body.id

    const sql = `DELETE FROM books WHERE ?? = ?`
    const sqlData = ['id', id]

    pool.query(sql, sqlData, (err, result) => {
        if (err) console.log(err)
        res.redirect('/books')
    })
})

//UPDATE - Edição
app.get('/books/edit/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM books WHERE ?? = ?`
    const sqlData = ['id', id]

    pool.query(sql, sqlData, (err, result) => {
        if (err) console.log(err)
        const book = result[0]
        res.render('bookedit', {book})
    })
})

app.post('/books/edit/:id', (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`
    const sqlData = ['title', title, 'page_qt', pageqty, 'id', id]

    pool.query(sql, sqlData, (err, result) => {
        if (err) console.log(err)
        res.redirect('/books')
    })
})

//SELECT WHERE (DADO ESPECÍFICO)
app.get('/books/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM books WHERE ?? = ?`
    const sqlData = ['id', id]

    pool.query(sql, sqlData, (err, result) => {
        if (err) console.log(err)
        const book = result[0]
        console.log(book)
        res.render('bookdata', {book})
    })
})

//SELECT *
app.get('/books', (req, res) => {
    const sql = 'SELECT * FROM books'
    pool.query(sql, (err, result) => {
        if (err) throw err
        const books = result
        console.log(books)
        res.render('books', {books})
    })
})

//INSERT
app.post('/bookcad', (req, res) => {
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `INSERT INTO books (??, ??) VALUES (?, ?)`
    const sqlData = ['title', 'page_qt',title, pageqty]

    pool.query(sql, sqlData, (err, result) => {
        if (err) console.log(err)
        console.log(result)
        res.redirect('/books')
    })
})

app.get('/bookcad', (req, res) => {
    res.render('bookcad')
})

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})
