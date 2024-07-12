    const mongoose = require('mongoose')

    const  scheduleSchema = new mongoose.Schema({
        date: {type: String, required: true, unique: true },
        tooth: {type:Number,  required: true, unique: true },
        schedule: {type: String, required: true, unique: true },
        amount: { type: Number, required: true, unique: true },
        price: { type: Number, required: true, unique: true },
        discount: {type: Number, required: true, unique: true },
        total: { type: Number, required: true, unique: true },
        paid: { type: Number, required: true, unique: true },
        unpaid: { type: Number, required: true, unique: true },
    })

    const profileSchema = new mongoose.Schema({
        code: { type: {year: Number, count: Number}, required: true, unique: true },
        fullname: { type: String, required: true, unique: true },
        yearofbirth: {type:String, required: true, unique: true},
        sex: { type: String, required: true, unique: true },
        phone: {type: String, required: true, unique: true},
        address: {type: String, required: true, unique: true},
        job: { type: String, required: true },
        record: [String],
        schedules: [scheduleSchema]
    })

    const Profile = mongoose.model('Profile', profileSchema)

    module.exports = Profile