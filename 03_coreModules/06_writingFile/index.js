const http  = require('http')
const fs    = require('fs')
const url   = require('url')
const path = require('path')

const port = 3000
const server = http.createServer((req, res) => {
    const urlInfo   = url.parse(req.url, true)
    const name      = urlInfo.query.name
    const fileNames = {'form' : 'form.html', 'nome' : 'nome.txt'}
    if (!name) {
        var filePath  = path.join(__dirname, fileNames['form'])
        fs.readFile(filePath, (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data)
            return res.end()
        })
    } else {
        res.writeHead(302, {location: '/'})
        var filePath = path.join(__dirname, fileNames['nome'])
        fs.writeFile(filePath, name, () => {
            console.log('Arquivo criado com sucesso!')
        })
        res.end()
    }
})

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})
