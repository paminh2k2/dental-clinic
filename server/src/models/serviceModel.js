const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    service: {type: String, required: true, unique: true},
    price: {type: {min: Number, max: Number}, required: true, unique: true},
    note: {type: String},
})

const Service = mongoose.model('Service', serviceSchema)

module.exports = Service