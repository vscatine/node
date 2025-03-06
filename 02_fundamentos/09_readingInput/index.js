const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})

readline.question("Qual sua linguagem de programação favotira? ", (language) => {
    console.log(`Sua linguagem preferida é ${language}.`)
    readline.close()
})
