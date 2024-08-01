const mongoose = require('mongoose')

const dateSchema = new mongoose.Schema({
    day: {type: Number},
    month: {type: Number},
    year: {type: Number}
})

const revenueSchema = new mongoose.Schema({
    fullname: {type: String},
    service: { type: String},
    date: {type: dateSchema},
    
})

const Revenue = mongoose.model('Revenue', revenueSchema)

module.exports = Revenue