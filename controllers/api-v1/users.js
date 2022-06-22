const router = require('express').Router()
const db = require('../../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// POST /users/register --
router.post('/register', async (req, res) => {
    try{
        // check if the user exists already
        const findUser = await db.User.findOne({
            email: req.body.email
        })
        // disallow users from registering twice
        if(findUser) {
            // stop the route and send a response saying the user exists
            return res.status(400).json({ msg: 'email exists already'})
        }
        // hash the user's password
        const password = req.body.password
        const saltRounds = 12
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        // create a new user with the hashed password
        const newUser = new db.User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        await newUser.save()
        // sign the user in by sending a valid jwt back
        // create thh jwt payload
        const payload = {
            name: newUser.name,
            email: newUser.email,
            id: newUser.id
        }
        // sign the token and send it back
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'}) //expires in one day
        res.json(token)
    }catch(err){
        console.warn(err)
        // handle validation errors
        if(err.name === "ValidationError"){
            res.status(400).json({ msg: err.message})
        }else {
        // handle all other errors
        res.status(500).json({ msg: 'server error 500'})
        }
    }
})

// POST /users/login -- validate login credentials
router.post('/login', (req, res)=> {
    // all the data will come in on the req.body
    // try to find the user in the database

    // if the user is not found, return send a status of 400. let the user know login failed

    // check if the supplied password matches the hased password in the database
    // if they do not match return and let the user know that login has failed

    // create a jwt payload
    // sign the jwt and send it back

    // don't forget to handle your errors
})

// GET /auth-locked -- checks users credentials and only send back privilaged information if the user is logged in properly
router.get('/auth-locked', (req, res) => {
    res.json({ msg: 'welcome to the secret auth-locked route'})
})


module.exports = router