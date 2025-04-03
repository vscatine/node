const e = require('express')
const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

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
    const sql = `DELETE FROM books WHERE id = ${id}`
    conn.query(sql, (err, result) => {
        if (err) console.log(err)
        res.redirect('/books')
    })
})

//DELETE POST
app.post('/books/delete/:id', (req, res) => {
    const id = req.body.id
    const sql = `DELETE FROM books WHERE id = ${id}`
    conn.query(sql, (err, result) => {
        if (err) console.log(err)
        res.redirect('/books')
    })
})

//UPDATE - Edição
app.get('/books/edit/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM books WHERE id = ${id}`
    conn.query(sql, (err, result) => {
        if (err) console.log(err)
        const book = result[0]
        res.render('bookedit', {book})
    })
})

app.post('/books/edit/:id', (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const pageqty = req.body.pageqty
    const sql = `UPDATE books SET title = '${title}', page_qt = '${pageqty}' WHERE id = '${id}'`
    conn.query(sql, (err, result) => {
        if (err) console.log(err)
        res.redirect('/books')
    })
})

//SELET WHERE (DADO ESPECÍFICO)
app.get('/books/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM books WHERE id = ${id}`
    conn.query(sql, (err, result) => {
        if (err) console.log(err)
        const book = result[0]
        console.log(book)
        res.render('bookdata', {book})
    })
})

//SELECT *
app.get('/books', (req, res) => {
    const sql = 'SELECT * FROM books'
    conn.query(sql, (err, result) => {
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
    const sql = `INSERT INTO books (title, page_qt) VALUES ('${title}', '${pageqty}')`
    conn.query(sql, (err, result) => {
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

const conn = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'password',
    database: 'nodemysql2'
})

conn.connect((err) => {
    if (err) {
        console.log(err)
        return
    }

    console.log(`Conectado ao BD ${conn.database}`)

    app.listen(port, () => {
        console.log(`App rodando na porta ${port}`)
    })
})
