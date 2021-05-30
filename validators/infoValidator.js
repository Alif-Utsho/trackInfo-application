const infoValidator = info => {
    let error = {}

    if (!info.source) {
        error.source = 'Please provide a Source'
    }
    if (!info.destination) {
        error.destination = 'Please provide a Destination'
    }
    if (!info.amount) {
        error.amount = 'Please provide an Amount'
    }
    if (!info.time) {
        error.time = 'Please provide a Date'
    }
    if (!info.truck) {
        error.truck = 'Please select a Truck'
    }
    
    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = infoValidator