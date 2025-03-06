const x =  'x'

if(!Number.isInteger(x)) {
    throw new Error('ERRO: O valor não é um número inteiro.')
}

//A mensagem a baixo não será exibida pois o throw encerra o programa.

console.log('Continuando o programa com um número inteiro.')
