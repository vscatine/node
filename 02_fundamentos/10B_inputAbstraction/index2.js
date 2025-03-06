import inquirer from "inquirer";
import chalk from "chalk";

async function main(qtdNotas) {
    const answers = {}
    for (let c = 1; c <= qtdNotas; c++) {
        while (true) {
            const response = await inquirer.prompt([
                {
                    name: `p${c}`,
                    message: `Valor da P${c}: `,
                }
            ])

            const nota = response[`p${c}`]
            if (!validaNota(nota)) {
                const erro = 'Erro: Insira um valor numério entre 0 e 10. Exemplo: 7.55'
                console.log(chalk.red(erro))
                continue
            }
            answers[`p${c}`] = parseFloat(nota)
            break
        }
    }

    
    console.log(answers)
}

function validaNota(nota) {
    if (isNaN(nota) || empty(nota) || nota < 0 || nota > 10) {
        return false
    }
    return true
}

function empty(val) {
    if (val == '' || val == undefined || val == null) {
        return true
    } 
    return false
}

main(3);
