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

//helpers
function accountExist(accountName) {
    if (fs.existsSync(`accounts/${accountName}.json`)) {
        return true
    }
    return false
}

function accountReturnJSON(accountName) {
    const data = fs.readFileSync(`accounts/${accountName}.json`, 'utf-8')
    const accountData = JSON.parse(data)
    return accountData
}

function accountAddAmount(accountName, amount) {
    if (!amount || amount <= 0) {
        console.log(clr.bgRed(`Valor do depósito deve ser maior do que R$0,00`))
        console.log(clr.yell(`Reiniciando depósito...`))
        setTimeout(() => {
            accountDeposit()
        }, 3000);
        return
    }

    const account = accountReturnJSON(accountName)
    account.balance = parseFloat(account.balance) + parseFloat(amount)    

    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(account), (err) => {
        if (err) console.log(err)
    })

    console.log(clr.bgWhite.bold(`Depósito de R$${amount},00 realizado com sucesso!`))
    console.log(clr.bgWhite.bold('Saldo atual: ' + clr.green(`R$${account.balance},00\n`)))
    return confirmReturnToOperation()
}

function accountRemoveAmount(accountName, amount) {
    if (!amount || amount <= 0) {
        console.log(clr.bgRed(`Valor a sacar deve ser maior do que R$0,00`))
        console.log(clr.yell(`Reiniciando saque...`))
        setTimeout(() => {
            accountWithdraw()
        }, 3000);
        return
    }

    const account = accountReturnJSON(accountName)
    const remainBalance = parseFloat(account.balance) - parseFloat(amount)

    if (remainBalance < 0) {
        console.log(clr.bgRed(`Saldo não pode ficar negativo:`))
        console.log(clr.green(`Saldo atual: R$${account.balance},00`))
        console.log(clr.red(`Valor do saque: R$${amount},00`))
        console.log(clr.yell(`Reiniciando saque...`))
        setTimeout(() => {
            accountWithdraw()
        }, 4000);
        return
    }

    account.balance = remainBalance
    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(account))
    console.log(clr.bgWhite.bold(`Saque de R$${amount},00 realizado com sucesso!`))
    console.log(clr.bgWhite.bold('Saldo atual: ' + clr.green(`R$${remainBalance},00\n`)))
    return confirmReturnToOperation()
}

function confirmReturnToOperation() {
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
                console.log(clr.yell('\nRetornando para o menu principal...\n'))
                setTimeout(() => {
                    console.clear()
                    operation()
                }, 2000)
                return
            }
            
            return bankClose()
        })
        .catch(err => console.log(err))
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
            if (newAccount === 'Sim') {
                console.clear()
                return accountCreate()
            } 
            return confirmReturnToOperation()
        })
        .catch(err => console.log(err))
}

//Begin the software
bankOpen()

function bankOpen() {
    console.log(clr.bgYell.bold(`Bem-vindo ao ${bankName}!\n`))
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
        .catch(err => console.log(err))
}

function accountCreate() {
    console.log(clr.bgGreen(`Parabéns por escolher o ${bankName}!`))
    setTimeout(() => {
        console.log(clr.yell('Insira os dados para criação da conta...'))
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
                return confirmReturnToOperation()
            }

            fs.writeFileSync(`accounts/${parsed}.json`, '{"balance" : 0}')
            console.log(clr.bgWhite.bold(clr.green(`${parsed}`) + ' -> Conta criada com sucesso!\n'))
            return confirmReturnToOperation()
        })
        .catch(err => console.log(err))
}

function accountBalance() {
    console.clear()
    console.log(clr.bgGreen.bold(`   EXTRATO   `))
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
                setTimeout(() => {
                    accountBalance()
                }, 1500);
                return
            }
            if (parsed === 'cancelar') {
                console.log(clr.bgRed(`Extrato bancário cancelado.`))
                return confirmReturnToOperation()
            }

            if (!accountExist(parsed)) {
                console.log(clr.bgRed(`Conta não encontrada.`))                
                return accountCreateConfirm()
            }

            const account = accountReturnJSON(parsed)
            console.log(clr.bgWhite.bold(`\nConta ${parsed}`))
            console.log(clr.bgWhite.bold('Saldo: ' + clr.green(`R$ ${account.balance},00\n`)))
            confirmReturnToOperation()
        })
        .catch(err => console.log(err))
}

function accountDeposit() {
    console.clear()
    console.log(clr.bgWhite.bold(`   DEPÓSITO   `))
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da conta para depósito?',
        }
    ])
        .then((answer) => {
            const accountName = answer['accountName']
            const parsed = accountName.toLowerCase().replace(/\s+/g, '')
            if (!parsed) {
                console.log(clr.bgRed(`Obrigatório passar nome da conta.`))
                setTimeout(() => {
                    accountDeposit()
                }, 1500);
                return
            }
            
            if (!accountExist(parsed)) {
                console.log(clr.bgRed('Conta não encontrada.'))
                return accountCreateConfirm()
            }

            inquirer.prompt([
                {
                    type:       'number',
                    name:       'amount',
                    message:    'Valor do depósito: R$ '
                }
            ])
                .then((answer) => {
                    const amount = answer['amount']                 
                    accountAddAmount(parsed, amount)
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}

function accountWithdraw() {
    console.clear()
    console.log(clr.bgWhite.bold('   SAQUE   '))
    inquirer.prompt([
        {
            name        : 'accountName',
            message     : 'Qual o nome da conta?'
        }
    ])
        .then((answer) => {
            const accountName = answer['accountName']
            const parsed = accountName.toLowerCase().replace(/\s+/g, '')
            if (!parsed) {
                console.log(clr.bgRed(`Obrigatório passar nome da conta`))
                setTimeout(() => {
                    accountWithdraw()
                }, 1500);
                return
            }

            if (!accountExist(parsed)) {
                console.log(clr.bgRed(`Conta não encontrada.`))
                return accountCreateConfirm()
            }

            inquirer.prompt([
                {
                    type:       'number',
                    name:       'amount',
                    message:    'Valor a sacar R$'
                }
            ])
                .then((answer) => {
                    const amount = answer['amount']
                    accountRemoveAmount(parsed, amount)
                })
                .catch(err => console.log(err))           
        })
        .catch(err => console.log(err))
}

function bankClose() {
    console.log(clr.bgYell.bold(`\n${bankName} agradece sua visita. Até logo!`))
    setTimeout(() => {
        console.clear()
        exit
    }, 1500)
    return
}
