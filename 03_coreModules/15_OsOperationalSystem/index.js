const os = require('os')

const osObj = {
    'cpusQuant'     : os.cpus().length,
    'freeMemory'    : os.freemem(),
    'HomeDir'       : os.homedir(),
    'type'          : os.type()
}

console.log(osObj)
console.log(os.cpus())
