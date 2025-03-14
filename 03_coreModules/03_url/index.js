const url = require('url')
const address = 'https://meusite.com.br/catalogo?produtos=cadeira&cor=green'
const parsedURL = new url.URL(address)

console.log(`Protocol: ${parsedURL.protocol}`)
console.log(`Host: ${parsedURL.host}`)
console.log(`Pathname: ${parsedURL.pathname}`)
console.log(`Search: ${parsedURL.search}`)
console.log(`Search Params: ${parsedURL.searchParams}`)
console.log(`Search Params (GET): ${parsedURL.searchParams.get('produtos')}`)
