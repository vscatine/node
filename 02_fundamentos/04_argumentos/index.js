// email="teste@domain.com"
const args = process.argv
const email = args[2].split("=")[1]
console.log(email)
