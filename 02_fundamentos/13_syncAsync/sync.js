const fs = require('fs')

console.log('Início')

fs.writeFileSync('sync.txt', 'Olá, Sincrono!')

console.log('Arquvido SYNC criado com sucesso!')

console.log('Fim.')
