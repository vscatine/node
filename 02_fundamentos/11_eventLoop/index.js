function a() {
    console.log('Excutando A')
}

function b() {
    console.log('Excutando B')
    c()
    a()
}

function c() {
    console.log('Excutando C')
}

b()
a()
c()

console.log('\nChamando B sozinho\n')

b()
