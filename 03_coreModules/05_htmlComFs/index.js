const http  = require('http')
const fs    = require('fs')
const path  = require('path')

const port = 3000
const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, 'message.html')
    fs.readFile(filePath, (err, data) => {
        res.setHeader('Content-Type', 'text/html')
        res.write(data)
        return res.end()
    })
})

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}.`)
})
