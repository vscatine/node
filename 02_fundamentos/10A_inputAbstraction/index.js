import inquirer from "inquirer";

inquirer.prompt([
    {
        name: 'p1',
        message: 'Qual a nota da P1? ',
        validate: (value) => {
            if (isNaN(value) || value < 0 || value > 10) {
                return 'Valor inválido! Insira uma nota de 0 a 10.'
            } else {
                return true
            }
        }
    }, 
    {
        name: 'p2',
        message: 'Qual a nota da P2? ',
        validate: (value) => {
            if (isNaN(value) || value < 0 || value > 10) {
                return 'Valor inválido! Insira uma nota de 0 a 10.'
            } else {
                return true
            }
        }
    }
]).then((answers) => {
    const n1 = parseFloat(answers['p1'])
    const n2 = parseFloat(answers['p2'])
    const media = (n1 + n2) / Object.keys(answers).length
    console.log(`Media: ${media}`)
})
.catch((err) => {
    console.log(err)
})
