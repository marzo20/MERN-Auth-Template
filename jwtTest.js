const jwt = require('jsonwebtoken')

// tokens that are not verified will throw and error toe the catch

try {
    // create a jwt 'payload' (the info that you want to encode in the token)
    // user data from the db
    const payload = {
        name: 'test boi',
        email: 'test@boi.com',
        // NO PASSWORD
        id: 'hi i am the user id'
    }
    // this is a jwt
    // part one how the jwt in encoded:yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    // the encode payload (all the user data):eyJuYW1lIjoidGVzdCBib2kiLCJlbWFpbCI6InRlc3RAYm9pLmNvbSIsImlkIjoiaGkgaSBhbSB0aGUgdXNlciBpZCIsImlhdCI6MTY1NTkyNDI3OCwiZXhwIjoxNjU1OTMwMjc4fQ.
    // signature we created with the secret:oLwxU4HzcoYlsWNcclNW6GMFYhaIeyaEp9hjs4E6Tq8
    

    // sign and encode our jwt payload
    // jwt.sign(data. to encode,  secret to sign winth options object)
    const token = jwt.sign(payload, 'my super duper big secret', { expiresIn: 60 * 100})
    console.log(token)

    const decode = jwt.verify(token, 'my super duper big secret')
    console.log('decoded payload: ', decode)
}catch(err){
    console.log('jwt error', err)
}