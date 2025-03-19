const { error } = require('console')
const fs    = require('fs')
const path  = require('path')

let fileOld = path.join(__dirname, 'fileOriginal.txt')
let fileNew = path.join(__dirname, 'fileRenamed01.txt')

fs.rename(fileOld, fileNew, (err) => {
    if (err) {
        console.log(err)
        return
    }

    console.log(`Arquivo ${fileOld} renomeado para ${fileNew}`)
})
