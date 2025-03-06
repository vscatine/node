import inquirer from "inquirer"

function validaNota(nota) {
    if (isNaN(nota) || nota < 0 || nota > 10) {
        return false
    } 
    return true
}

inquirer.prompt([
    {
        name: 'p1',
        message: "Valor da P1: ",
        validate: (value) => {
            if (!validaNota(value)) {
                console.clear()
                return 'Erro: A nota deve um valor númerio entre 0 e 10.'
            }
            return true
        }
    },
    {
        name: 'p2',
        message: 'Valor da P2: ',
        validate: (value) => {
            if (!validaNota(value)) {
                return 'Erro: A nota deve um valor númerio entre 0 e 10.'
            }
            return true
        }
    }
])
.then((answers) => {
    const n1 = parseFloat(answers['p1'])
    const n2 = parseFloat(answers['p2'])
    const media = (n1 + n2) / Object.keys(answers).length
    console.log(
        `Aluno X
        Nota 1: ${n1}
        Nota 2: ${n2}
        Media: ${media}`
    )
})
.catch((err) => {
    console.log(`Error: ${err}`)
})
