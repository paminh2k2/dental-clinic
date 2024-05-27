const express = require('express');
const router = express.Router();

const revenueController = require('../app/controllers/RevenueController');
router.get('/search', revenueController.search);
router.get('/', revenueController.home);

module.exports = router;
