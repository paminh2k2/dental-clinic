const mongoose = require('mongoose')

const recordSchema = new mongoose.Schema({
    value: {type: String, required: true, unique: true},
    content: {type: String, required: true, unique: true}
})

const Record = mongoose.model('Record', recordSchema)

module.exports = Record