const _ = require('lodash')

const arr01 = [5, 9, 15, 85, 33]
const arr02 = [33, 15, 193, 12, 5]

console.log(_.difference(arr01, arr02))
console.log(_.difference(arr02, arr01))
