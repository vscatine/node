const path = require('path')

const pathMock = '/teste/vitor/relatorio.pdf'

const pathObj = {
    'dirname'   : path.dirname(pathMock),
    'basename'  : path.basename(pathMock),
    'extname'   : path.extname(pathMock),
}

console.log(Object.entries(pathObj))
