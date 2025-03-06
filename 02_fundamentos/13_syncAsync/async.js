const fs = require('fs')

console.log('Início')

fs.writeFile('async.txt', 'Esse é assíncrono.', function(err) {
    setTimeout(() => {
        console.log('Arquivo ASYNC criado com sucesso!')
    }, 2000);
})

console.log('Fim.')