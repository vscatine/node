const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const nome = rl.question('Qual o seu nome? ', (name) => {
    if (name == 'vitor' || name == 'eike') {
        console.log(`Olá, ${name}, você é legal!`)
        rl.close()
        return 
    } 
    console.log(`Olá, ${name}.`)
    rl.close()
})
