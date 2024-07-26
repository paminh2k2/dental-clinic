    const mongoose = require('mongoose')

    const  scheduleSchema = new mongoose.Schema({
        id: {type: Number},
        date: {type: String},
        tooth: {type:String},
        schedule: {type: String},
        amount: { type: Number},
        price: { type: Number},
        discount: {type: Number},
        total: { type: Number},
        paid: {type: Number},
        unpaid: {type: Number}
    })

    const profileSchema = new mongoose.Schema({
        code: { type: {year: Number, count: Number}, required: true, unique: true },
        fullname: { type: String, required: true, unique: true },
        yearofbirth: {type:String},
        sex: { type: String },
        phone: {type: String},
        address: {type: String},
        job: { type: String},
        record: [String],
        schedules: [scheduleSchema]
    })

    const Profile = mongoose.model('Profile', profileSchema)

    module.exports = Profile