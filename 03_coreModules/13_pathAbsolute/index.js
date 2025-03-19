const path = require('path')

//path Absoluto
console.log(path.resolve('teste.txt'))

//Formatar Path
const folder01  = 'relatorios'
const folder02  = '2025'
const file      = 'relatorioFinanceiro.csv'
const pathFinal = path.join('/', 'software', folder01, folder02, file)

console.log(pathFinal)
