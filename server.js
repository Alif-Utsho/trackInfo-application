const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

const loginRoutes = require('./routes/loginRoutes')

const app = express()

app.use(morgan('dev'))
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/users', loginRoutes)

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