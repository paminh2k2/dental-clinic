const express = require('express');
const router = express.Router();

const scheduleController = require('../app/controllers/ScheduleController');
router.get('/search', scheduleController.search);
router.get('/', scheduleController.home);

module.exports = router;
