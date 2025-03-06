const x = 10
const y = 'José'
const z = [1, 2]

//Imprime mais de um valor na mesma linha, mesmo de tipos diferentes.
console.log(x, y, z)

//Contagem de impressões
console.count(`O valor é ${x}, contagem: `)
console.count(`O valor é ${x}, contagem: `)
console.count(`O valor é ${x}, contagem: `)
console.count(`O valor é ${x}, contagem: `)
console.count(`O valor é ${x + 1}, contagem: `)
console.count(`O valor é ${x}, contagem: `)
console.count(`O valor é ${x}, contagem: `)

//váriavel entre strings
console.log('O nome é %s, ele é programador. Tirou nota %s', y, x)

//limpar o console
setTimeout(() => {
    console.clear()
}, 2000)