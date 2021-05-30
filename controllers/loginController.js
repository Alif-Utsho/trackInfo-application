const loginValidator = require("../validators/loginValidator")
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { resourceError, serverError } = require("../errors/errorHandler")
const jwt = require('jsonwebtoken')

module.exports = {
    loginGetController(req, res, next){
        res.send('<h1>This is Login get Router</h1>')
    },
    loginPostController(req, res, next) {
        let { username, password } = req.body
        let validator = loginValidator({ username, password })
        if (!validator.isValid) {
            return res.status(401).json(validator.error)
        }
        User.findOne({ username })
            .then(user => {
                if (!user) {
                    return resourceError(res, 'User not found')
                }
                bcrypt.compare(password, user.password, (err, matched) => {
                    if (err) {
                        return serverError(res)
                    }
                    if (!matched) {
                        return resourceError(res, 'Password doesn\'t matched')
                    }

                    let token = jwt.sign({
                        _id: user._id,
                        username: user.username,
                    }, 'SECRET', {expiresIn:'7d'})

                    res.status(200).json({
                        message: 'Logged in successfully',
                        token: `Bearer ${token}`
                    })
                })
            })
            .catch(err=>serverError(res))
    },

    // Register manually
    registerPostController(req, res, next) {
        let { username, password } = req.body
        let validator = loginValidator({ username, password })
        if (!validator.isValid) return res.json(401).json(validator.error)
        
        User.findOne({ username })
            .then(user => {
                if (user) {
                    validator.error.username = 'Username already exists'
                    return res.status(401).json(validator.error)
                }

                bcrypt.hash(password, 11, (err, hash) => {
                    if (err) {
                        return serverError(res)
                    }
                    let user = new User({ username, password: hash })
                    user.save()
                        .then(() => res.status(201).send({ message: 'User Saved', user }))
                        .catch((err) => serverError(res))
                })
            })
            .catch(err => serverError(res))
    }
}