import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs";
import { exit } from "process";

const bankName = 'Goliath National Bank'
const clr = {
    'bgGreen': chalk.bgGreen,
    'bgRed': chalk.bgRed,
    'bgWhite': chalk.bgWhite,
    'bgYell': chalk.bgYellow,
    'green': chalk.green,
    'red': chalk.red,
    'yell': chalk.yellow,
    'white': chalk.white,
    'bold': chalk.bold
}

//Begin the software
welcome()

function welcome() {
    console.log(clr.bgYell.white.bold(`Bem-vindo ao ${bankName}\n`))
    operation()
}

function operation() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que deseja fazer?',
            choices: [
                'Criar conta',
                'Sacar',
                'Depositar',
                'Sair'
            ]
        }
    ])
        .then((answer) => {
            const action = answer['action']
            if (action === 'Criar conta') {
                accountCreate()
            } else {
                console.log(clr.bgYell.bold(`\n${bankName} agradece sua visita. Até logo!\n`))
                setTimeout(() => {
                    console.clear()
                    exit
                }, 1500);
            }
        })
        .catch((err) => {
            if (err) console.log(clr.bgRed(err))
        })
}

function accountCreate() {
    console.log(clr.green(`Parabéns por escolher o ${bankName}!`))
    setTimeout(() => {
        console.log(clr.white('Insira os dados para criação da conta...'))
        accountBuild()    
    }, 1000);
    
}

function accountBuild() {
    if (!fs.existsSync('accounts')) {
        fs.mkdir('accounts', (err) => {
            if (err) console.log(err)
        })
    }
    inquirer.prompt([
        {
            type: 'input',
            name: 'accountName',
            message: 'Qual será o nome da conta?'
        }
    ])
        .then((answer) => {
            const accountName = answer['accountName']

            if (!accountName || typeof accountName !== 'string') {
                console.log(clr.bgRed(`Valor inválido!`))
                return accountBuild()
            }

            const parsed = accountName.toLowerCase().replace(/\s+/g, '')

            if (fs.existsSync(`accounts/${parsed}.json`)) {
                console.log(clr.bgRed('Conta já existe!'))
                return accountBuild()
            }

            fs.writeFileSync(`accounts/${parsed}.json`, '{"balance" : 0}')
            console.log(clr.bgGreen(`Conta criada com sucesso!`))
            console.log(clr.yell('Retornando para as opções...\n'))
            setTimeout(() => {
                return operation()
            }, 1000)
            
        })
        .catch((err) => {
            if (err) console.log(err)
        })
}
