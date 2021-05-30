const Info = require('../models/Info')
const infoValidator = require('../validators/infoValidator')


module.exports = {
    infoAddGetController(req, res, next) {
        res.send('<h1>This is info add get controller</h1>')
    },
    infoAddPostController(req, res, next) {
        let { source, destination, amount, time, truck } = req.body
        let validator = infoValidator({ source, destination, amount, time, truck })
        if (!validator.isValid) {
            res.status(401).json(validator.error)
        }

        let info = new Info({ source, destination, amount, time: time.slice(0,10), truck })
        info.save()
            .then(() => {
                res.status(201).json({ message: 'Info added', info })
            })
            .catch(err => {
                res.status(401).json({ message: 'Failed, Provide valid info' })
            })
    },

    allInfoGetController(req, res, next) {
        Info.find({})
            .then(infos => {
                if (infos.length === 0) {
                    res.status(200).json({
                        message: 'No Info Found'
                    })
                }
                else {
                    res.status(200).json(infos)
                }
            })
            .catch(err => {
                res.status(400).json({ message: 'Server error occured' })
            })
    }
}