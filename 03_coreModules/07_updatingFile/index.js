const http  = require('http')
const url   = require('url')
const fs    = require('fs')
const path  = require('path')

const port = 3000
const server = http.createServer((req, res) => {
    const urlInfo   = url.parse(req.url, true)
    const name      = urlInfo.query.name
    const fileNames = {
        'cadastro'  : 'cadastro.html',
        'nome'      : 'nome.txt',
        'sucesso'   : 'sucesso.html'
    }

    res.writeHead(200, {'content-type' : 'text/html'})
    if (!name) {
        var filePath = path.join(__dirname, fileNames['cadastro'])
        fs.readFile(filePath, (err, data) => {
            if (err) throw err
            res.write(data)
            return res.end()
        })
    } else {
        var filePathNome = path.join(__dirname, fileNames['nome'])
        var filePathSucesso = path.join(__dirname, fileNames['sucesso'])

        //Adiciona nome ao arquivo
        const nameRow = name + ', \r'
        fs.appendFile(filePathNome, nameRow, (err) => {
            if (err) throw err
            fs.readFile(filePathSucesso, (err, data) => {
                if (err) throw err
                res.write(data)
                return res.end()
                
            })
        })
    }
})

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})
