// args --name=something --ocupation=something
const minimist = require('minimist')
const args = minimist(process.argv.slice(2))
const name = args['name']
const ocupation = args['ocupation']

console.log(`Seu nome é ${name} e sua profissão é ${ocupation}.`)
