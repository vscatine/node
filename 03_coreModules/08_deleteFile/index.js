const fs    = require('fs')
const path  = require('path')

let file    = path.join(__dirname, 'arquivo.txt')
fs.unlink(file, (err) => {
    if (err) {
        console.log(err)
        return
    }

    console.log(`Arquivo excluído com sucesso!`)
})
