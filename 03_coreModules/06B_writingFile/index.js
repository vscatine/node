const http  = require('http')
const url   = require('url')
const fs    = require('fs')
const path  = require('path')

const port      = 3000
const server    = http.createServer((req, res) => {
    const urlInfo = url.parse(req.url, true)
    const name = urlInfo.query.name
    res.writeHead(200, {'content-type' : 'text/html'})
    let fileNames = {
        'cadastro'  : 'cadastro.html',
        'nome'      : 'nome.txt',
        'sucesso'   : 'sucesso.html'
    }
    if (!name) {
        var filePath = path.join(__dirname, fileNames['cadastro'])
        fs.readFile(filePath, (err, data) => {
            if (err) throw err
            res.write(data)
            return res.end()
        })
    } else {
        var filePath = path.join(__dirname, fileNames['nome'])
        //Cria arquivo com nome
        fs.writeFile(filePath, name, (err) => {
            if (err) throw err
        })

        var filePath = path.join(__dirname, fileNames['sucesso'])
        fs.readFile(filePath, (err, data) => {
            if (err) throw err
            res.write(data)
            return res.end()
        })
    }
})

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})
