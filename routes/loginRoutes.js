const router = require('express').Router()
const {loginGetController, loginPostController, registerPostController} = require('../controllers/loginController')

router.get('/login', loginGetController)
router.post('/login', loginPostController)
router.post('/register', registerPostController)

module.exports = router