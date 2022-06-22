// required packages
require('dotenv').config()
require('./models') //connect to the db
const express = require('express')
const cors = require('cors')
// app  config/middlewares
const app = express()
const PORT = process.env.PORT || 8000
app.use(cors())
app.use(express.json()) //json req.bodies

// simple middleware
// app.use((req, res, next) => {
//     console.log('hello I am a middleware')
//     res.locals.myData = 'Iam data that is passed out of the middleware'
//     // tell express to move on to the next thing
//     next()
// })

const myMiddleware = (req, res, next) => {
    console.log('hello I am a middleware')
    res.locals.myData = 'Iam data that is passed out of the middleware'
    // tell express to move on to the next thing
    next()
}

// routes and controllers
app.get('/', myMiddleware, (req, res) => {
    res.json({ msg: 'welcome to the backend! itgood to be back'})
    console.log(res.locals.myData)
})

app.use('/api-v1/users', require('./controllers/api-v1/users'))

// listen on a port
app.listen(PORT, () => {
    console.log(
    `is the port ${PORT} that I hear?`
    )
})