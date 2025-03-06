const { stringify } = require('querystring')

const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("Qual o seu nome? ", (name) => {
    const n = String(name).trim().toLocaleLowerCase()
    switch(n){
        case 'vitor':
        case 'eike':
            console.log(`Olá, ${n}, você é legal!`)
            break
        case 'silvio':
        case 'arthur':
            console.log(`${n}? Que nome estranho kkk`)
            break
        default:
            console.log(`Olá, ${n}.`)
    }
    rl.close()
})
