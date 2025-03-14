const http = require('http')
const url = require('url')
const port = 3000
const server = http.createServer((req, res) => {
    res.setHeader('content-type', 'text/html')
    const urlInfo = url.parse(req.url, true)
    var cargo   = urlInfo.query.cargo
    var name    = urlInfo.query.name

    if(!name || !cargo) {
        res.end(`
            <h1>Digite seus dados</h1>
            <form method="GET">
            <div><label for="name">Nome</label></div>
            <div><input type="text" name="name"></div>
            <div><label for="cargo">Cargo</label></div>
            <div><input type="text" name="cargo"></div>
            <div><input type="submit" value="Enviar"></div>
            </form>
            `)
    } else {
        res.end(`
            <h1>Area de ${cargo}</h1>
            <h3>Bem-vindo, ${name}!</h3>
            `)
    }
    
})

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})
