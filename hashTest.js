const bcrypt = require('bcrypt')

const hashTest = async () => {
    try{
        // test hashing
        const password = 'hello'
        const saltRounds = 12
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        console.log('the hashed password is : ' , hashedPassword)

        // match the hash to a string
        const matchPasswords = await bcrypt.compare('june', hashedPassword)
        console.log('do they match?', matchPasswords)
    }catch(err){
        console.log(err)
    }
}

hashTest()