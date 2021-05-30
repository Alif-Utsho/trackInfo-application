const router = require('express').Router()
const { infoAddGetController, infoAddPostController, allInfoGetController } = require('../controllers/infoController')

router.get('/', allInfoGetController)

router.get('/info', infoAddGetController)
router.post('/info', infoAddPostController)


module.exports= router