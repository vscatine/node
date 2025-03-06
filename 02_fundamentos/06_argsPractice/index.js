//args  => --a=nfloat --b=float
//Modulo interno
const soma = require('./soma').soma
//Modulo exteno
const minimist = require('minimist')

const args = minimist(process.argv.slice(2))

const a = parseFloat(args['a'])
const b = parseFloat(args['b'])

soma(a, b)
