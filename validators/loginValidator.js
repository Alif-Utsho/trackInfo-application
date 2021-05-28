const loginValidator = user => {
    let error = {}

    if (!user.username) {
        error.username = 'Please provide an Username'
    }
    if (!user.password) {
        error.password = 'Please provide a Password'
    }

    return {
        error,
        isValid: Object.keys(error).length===0
    }
}

module.exports = loginValidator