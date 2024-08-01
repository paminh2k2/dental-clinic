const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    fullname: { type: String },
    date: { type: String },
    time: { type: String },
    services: [String]
})

const Appointment = mongoose.model( 'Appointment', appointmentSchema )

module.exports = Appointment