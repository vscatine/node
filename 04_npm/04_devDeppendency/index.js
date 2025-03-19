import chalk from "chalk"
import _ from "lodash"

const a = [1,2,3,4]
const b = [2,6,5,4]
const dif = _.difference(a, b)

console.log(chalk.red(dif))

console.log(chalk.bgBlue('Teste'))

