const serverError = res => {
    res.status(500).json({
        message:'Server error occured'
    })
}

const resourceError = (res, msg) => {
    res.status(401).json({
        message:msg
    })
}

module.exports = {serverError, resourceError}