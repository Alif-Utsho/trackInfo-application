const mongoose = require('mongoose')
const Schema = mongoose.Schema

const infoSchema = new Schema({
    source: {
        type: String,
        required: true,
        trim: true
    },
    destination: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        trim: true
    },
    time: {
        type: String,
        // default: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
        required: true,
        trim: true
    },
    truck: {
        type: String,
        required: true,
        trim: true
    }
})

const Info = new mongoose.model('Info', infoSchema)
module.exports = Info