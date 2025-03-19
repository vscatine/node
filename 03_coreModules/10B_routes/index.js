const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')

const port = 3000
const server = http.createServer((req, res) => {
    const urlInfo = url.parse(req.url, true)
    const query = urlInfo.pathname.substring(1)

    if (query && fs.existsSync(path.join(__dirname, query))) {
        fs.readFile(path.join(__dirname, query), (err, data) => {
            if (err) throw err
            res.writeHead(200, { 'content-type': 'text/html' })
            res.write(data)
            return res.end()
        })
    }

    fs.readFile(path.join(__dirname, '404.html'), (err, data) => {
        if (err) throw err
        res.writeHead(404, {'content-type' : 'text/html'})
        res.write(data)
        return res.end()
    })
})

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})
