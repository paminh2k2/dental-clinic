const Appointment = require('../models/appointmentModel')

exports.getAllAppointments = async ( req, res ) => {
    try {
        const appointments = await Appointment.find()
        res.json(appointments)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.createAppointment = async ( req, res ) => {
    const { fullname, date, time, services } = req.body
    try {
        const newAppointment = new Appointment({ fullname, date, time, services })
        const savedAppointment = await newAppointment.save()
        res.status(201).json(savedAppointment)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteAppointment = async ( req, res ) => {
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id)
        if(!deletedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' })
        }
        res.json({ message: 'Appointment deleted'})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updateAppointment = async ( req, res ) => {
    const { fullname, date, time, services } = req.body
    try {
        const updateAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { fullname, date, time, services },
            { new: true }
        )
        res.json(updateAppointment)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}