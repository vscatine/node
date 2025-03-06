const chalk = require('chalk')
const green = chalk.green
const redbg = chalk.red
console.log(chalk.green('Teste'))
console.log(chalk.red('Outro teste'))

var nota = Math.floor(Math.random() * (10 + 1))

if (nota >= 6) {
    console.log(`Aprovado com nota: ${green(nota)}`)
} else {
    console.log(`Reprovado com nota ${redbg(nota)}`)
}