//modules
import chalk from "chalk"
import inquirer from "inquirer"
import fs from "fs"
import { exit } from "process"

//global
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
    console.log(clr.bgYell(`Bem-vindo ao ${bankName}!\n`))
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
                'Extrato',
                'Depositar',
                'Sacar',
                'Sair'
            ]
        }
    ])
        .then((answer) => {
            const action = answer['action']
            switch (action) {
                case 'Criar conta':
                    accountCreate()
                    break
                case 'Extrato':
                    accountBalance()
                    break
                case 'Sacar':
                    accountWithdraw()
                    break
                case 'Depositar':
                    accountDeposit()
                    break
                default:
                    bankClose()
            }
        })
        .catch((err) => {
            if (err) console.log(err)
        })
}

function accountCreate() {
    console.log(clr.bgGreen(`Parabéns por escolher o ${bankName}!`))
    setTimeout(() => {
        console.log(clr.white('Insira os dados para criação da conta...'))
        accountBuild()
    }, 1000)
    return
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
            message: 'Qual será o nome da conta? ' + clr.red('[Digite cancelar para encerrar]')
        }
    ])
        .then((answer) => {
            const accountName = answer['accountName']
            const parsed = accountName.toLowerCase().replace(/\s+/g, '')

            if (!parsed) {
                console.log(clr.bgRed(`Valor inválido!`))
                return accountBuild()
            }

            if (fs.existsSync(`accounts/${parsed}.json`)) {
                console.log(clr.bgRed('Conta já existe!'))
                return accountBuild()
            }

            if (parsed === 'cancelar') {
                console.log(clr.bgRed(`Criação de conta cancelada.`))
                console.log(clr.yell(`\nRetornando para as opções...\n`))
                setTimeout(() => {
                    console.clear()
                    operation()
                }, 2000)
                return
            }

            fs.writeFileSync(`accounts/${parsed}.json`, '{"balance" : 0}')
            console.log(clr.green(`${clr.yell(parsed)} -> Conta criada com sucesso!`))
            console.log(clr.yell('\nRetornando para as opções...\n'))
            setTimeout(() => {
                console.clear()
                operation()
            }, 4000)
            return
        })
        .catch((err) => {
            if (err) console.log(err)
        })
}

function accountBalance() {
    inquirer.prompt([
        {
            name:       'accountName',
            message:    'Qual o nome da conta para extrato? ' + clr.red(`[Digite cancelar para encerrar]`)
        }
    ])
        .then((answer) => {
            const accountName = answer['accountName']
            const parsed = accountName.toLowerCase().replace(/\s+/g, '')

            if (!parsed) {
                console.log(clr.bgRed(`É necessário passar o nome da conta para extrato.`))
                return accountBalance()
            }

            if (parsed === 'cancelar') {
                console.log(clr.yell(`\nRetornando para as opções...\n`))
                setTimeout(() => {
                    console.clear()
                    operation()
                }, 3000)
                return
            }

            if (!accountExist(parsed)) {
                console.log(clr.bgRed(`Conta não encontrada.`))
                return accountCreateConfirm()
            }

            const data = fs.readFileSync(`accounts/${parsed}.json`, 'utf-8')
            const account = JSON.parse(data)
            console.log(clr.bgWhite.bold(`\nConta ${parsed}`))
            console.log(clr.bgWhite.bold('Saldo: ' + clr.green(`R$ ${account.balance},00\n`)))

            inquirer.prompt([
                {   
                    type:       'list',
                    name:       'returnOperation',
                    message:    'Retornar para o menu principal?',
                    choices:    [
                        'Sim',
                        'Não (sair)'
                    ]
                }
            ])
                .then((answer) => {
                    const option = answer['returnOperation']
                    if (option === 'Sim') {
                        console.log(clr.yell('\nRetornando para opções...\n'))
                        setTimeout(() => {
                            console.clear()
                            operation()
                        }, 2000)
                        return
                    }
                    
                    return bankClose()
                })
                .catch((err) => {
                    if (err) console.log(err)
                })
        })
        .catch((err) => {
            if (err) console.log(err)
        })
}

function accountDeposit() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da conta para depósito?',
        },
        {
            type: 'number',
            name: 'value',
            message: 'Valor do depósito: R$'
        }
    ])
        .then((answer) => {
            const accountName = answer['accountName']
            const parsed = accountName.toLowerCase().replace(/\s+/g, '')
            const value = answer['value']

            if (!parsed || !value) {
                console.log(clr.bgRed(`Obrigatório passar nome da conta e valor de depósito maior do que R$0,00.`))
                return accountDeposit()
            }
            
            if (!accountExist(parsed)) {
                console.log(clr.bgRed('Conta não encontrada.'))
                return accountCreateConfirm()
            }

            if (value <= 0) {
                console.log(clr.bgRed(`Valor do depósito deve ser maior do que R$0,00`))
                return accountDeposit()
            }

            const data      = fs.readFileSync(`accounts/${parsed}.json`, 'utf-8')
            const account   = JSON.parse(data)
            //soma o depósito (value) ao saldo (balance)
            account.balance += value

            fs.writeFileSync(`accounts/${parsed}.json`, JSON.stringify(account))
            
            console.log(clr.yell(`Depósito de R$${value},00 realizado com sucesso!`))
            console.log(clr.green(`Saldo atual: R${account.balance},00`))

            console.log(clr.yell('\nRetornando para as opções...\n'))
            setTimeout(() => {
                console.clear()
                operation()
            }, 5000)
            return
        })
        .catch((err) => {
            if (err) console.log(err)
        })
}

function accountWithdraw() {
    inquirer.prompt([
        {
            name        : 'accountName',
            message     : 'Qual o nome da conta?'
        },
        {
            type        :  'number',
            name        : 'value',
            message     : 'Valor a sacar: R$'
        }
    ])
        .then((answer) => {
            const accountName = answer['accountName']
            const value = answer['value']
            const parsed = accountName.toLowerCase().replace(/\s+/g, '')

            if (!parsed || !value) {
                console.log(clr.bgRed(`Obrigatório passar nome da conta e valor do saque maior do que R$0,00.`))
                return accountWithdraw()
            }

            if (!accountExist(parsed)) {
                console.log(clr.bgRed(`Conta não encontrada.`))
                return accountCreateConfirm()
            }

            if (value <= 0) {
                console.log(clr.bgRed(`Valor do saque deve ser maior que R$0,00`))
                return accountWithdraw()
            }

            const data = fs.readFileSync(`accounts/${parsed}.json`, 'utf-8')
            const account = JSON.parse(data)

            const remainBalance = account.balance - value

            if (remainBalance < 0) {
                console.log(clr.bgRed(`Saldo não pode ficar negativo:`))
                console.log(clr.green(`Saldo atual: R$${account.balance}`))
                console.log(clr.red(`Valor do saque: R$${value}`))
                setTimeout(() => {
                    console.log(clr.yell(`\nRetornando para as opções...\n`))    
                }, 1000)
                setTimeout(() => {
                    console.clear()
                    operation()    
                }, 5000)
                return
            }
            
            account.balance = remainBalance
            fs.writeFileSync(`accounts/${parsed}.json`, JSON.stringify(account))
            console.log(clr.green(`Saque de R$${value},00 realizado com sucesso!`))
            console.log(clr.bgWhite.black(`Saldo remanescente R$${remainBalance},00`))
            setTimeout(() => {
                console.log(clr.yell(`\nRetornando para as opções...\n`))    
            }, 1000)
            setTimeout(() => {
                console.clear()
                operation()    
            }, 5000)
            return
        })
        .catch((err) => {
            if (err) console.log(err)
        })
}

function accountExist(accountName) {
    if (fs.existsSync(`accounts/${accountName}.json`)) {
        return true
    }
    return false
}

function accountCreateConfirm() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'newAccount',
            message: 'Gostaria de cadastrar uma nova conta?',
            choices: [
                'Sim',
                'Não'
            ]
        }
    ])
        .then((answer) => {
            const newAccount = answer['newAccount']
            if (newAccount === 'Sim')  return accountCreate()

            console.log(clr.yell('\nRetornando para as opções...\n'))
            setTimeout(() => {
                console.clear()
                operation()
            }, 1000)
            return
        })

        .catch((err) => {
            if (err) console.log(err)
        })
}

function bankClose() {
    console.log(clr.bgYell(`\n${bankName} agradece sua visita. Até logo!`))
    setTimeout(() => {
        console.clear()
        exit
    }, 1500)
    return
}
