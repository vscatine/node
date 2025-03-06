import chalk from "chalk";
import inquirer from 'inquirer'

const yellowBlack = chalk.bgYellow.black

inquirer.prompt([
    {
        name: 'name',
        message: 'Qual o seu nome? '
    },
    {
        name: 'age',
        message: 'Qual sua idade? ',
        validate: (value) => {
            if(!Number.isInteger(parseInt(value)) || value < 0) {
                 return 'Erro: A idade deve ser um valor numérico maior que 1'
            }
            return true
        }
    }
])
.then((answers => {
    console.log(yellowBlack(`Nome: ${answers['name']} \nIdade: ${answers['age']}`))
}))
.catch((err) => {
    console.log(`Erro: ${err}`)
})
