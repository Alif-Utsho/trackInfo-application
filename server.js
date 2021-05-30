const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const loginRoutes = require('./routes/loginRoutes')
const infoRoutes = require('./routes/information')

const app = express()

app.use(morgan('dev'))
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// console.log(`${new Date().getFullYear()}-${ new Date().getMonth()+1 }-${new Date().getDate()}`)
app.use('/api/users', loginRoutes)
app.use('/api/track', infoRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.get('/', (req, res) => {
    res.send('<h1>Track Info application</h1>')
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
    mongoose.connect('mongodb+srv://testUser:pass123@test-db.ykwsx.mongodb.net/track-info?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Database connection stablished')
        })
        .catch(err => {
            console.log('Error occured with Database connenction')
        })
})