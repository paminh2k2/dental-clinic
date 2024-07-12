const express = require('express')
const router = express.Router()
const servicesController = require('../controllers/servicesController')

router.delete('/:id', servicesController.deleteService)
router.put('/:id', servicesController.updateService)
router.post('/', servicesController.createService)
router.get('/', servicesController.getAllServices)

module.exports = router