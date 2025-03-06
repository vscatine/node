const x = 'x'

try {
   if(!Number.isInteger(x)) {
    throw new Error('O valor deve ser um número inteiro.')
   }
} catch (err) {
    console.log(`Meu Erro: ${err.message}`)
}

console.log('Continuando após try catch')
