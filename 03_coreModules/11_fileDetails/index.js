const fs = require('fs')
const path = require('path')

fs.stat(path.join(__dirname, 'teste.txt'), (err, stat) => {
    if (err) {
        console.log(err)
        return
    }
    var arrStats = {
        'file?'         : stat.isFile(),
        'directory?'    : stat.isDirectory(),
        'symbolycLink?' : stat.isSymbolicLink(),
        'createdTime'   : stat.ctime,
        'size'          : stat.size
    }

    console.log( Object.entries(arrStats))
})
