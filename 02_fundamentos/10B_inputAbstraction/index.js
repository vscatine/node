import inquirer from "inquirer";

async function main() {
    const answers = {}

    while (true) {
        const {p1} = await inquirer.prompt([])
    }

    const answers2 = await inquirer.prompt([
        {
            name: 'p1',
            message: 'Valor da P1: ',
            validate: validaNota,
            filter: clearInput
        },
        {
            name: 'p2',
            message: 'Valor da P2: ',
            validate: validaNota,
            filter: clearInput
        }
    ])
    console.log(answers)
}

function validaNota(nota) {
    const num = parseFloat(nota)
    if (isNaN(num) || num < 0 || num > 10) {
        return 'Erro: Inserir valor númerio entre 0 e 10. Exemplo: 7.55'
    }
    return true
}

function clearInput(input) {
    const num = parseFloat(input)
    return isNaN(num) || num < 0 || num > 10 ?  undefined : num
}

main()
