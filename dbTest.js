const db = require('./models')

// testing user CREATE

db.User.create({
    name: 'Test boi',
    email: 'test@boi.com',
    password: 'testerboi1234'
    })
    .then(user => {
        console.log('what up testboi!',user)
    })
    .catch(console.warn)