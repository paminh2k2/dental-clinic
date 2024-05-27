const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Profile = new Schema({
    ms: String,
    name: Object,
    phone: String,
    address: String,
    sex: String,
    job: String,
    birthday: Object,
})

module.exports = mongoose.model('Profile', Profile)