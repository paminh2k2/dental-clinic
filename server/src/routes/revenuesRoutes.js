const express = require('express')
const router = express.Router()
const revenueController = require('../controllers/revenueController')

router.post('/', revenueController.createRevenue)
router.get('/', revenueController.getAllRevenues)

module.exports = router