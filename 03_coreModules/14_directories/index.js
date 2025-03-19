const fs    = require('fs')
const direc = 'criandoPastaCondicional'
if(!fs.existsSync(`./${direc}`)) {
    console.log('Pasta não encontrada. Criando...')
    fs.mkdirSync(direc)
    console.log('Pasta criada!')
    return
}

console.log(`Pasta: ${direc} já existe.`)
