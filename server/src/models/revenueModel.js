const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    day: {type: Number, required: true, unique: true},
    total: {type: Number, required: true, unique: true}
})

const revenueSchema = new mongoose.Schema({
    date: { type: String, required: true, unique: true },
    dataSet: [dataSchema]
})

const Revenue = mongoose.model('Revenue', revenueSchema)

module.exports = Revenue