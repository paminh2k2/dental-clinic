const express = require('express')
const router = express.Router()
const appointmentController = require('../controllers/appointmentsController')

router.delete('/:id', appointmentController.deleteAppointment)
router.put('/:id', appointmentController.updateAppointment)
router.post('/', appointmentController.createAppointment)
router.get('/', appointmentController.getAllAppointments)

module.exports = router