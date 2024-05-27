const express = require('express');
const router = express.Router();

const profilesController = require('../app/controllers/ProfilesController');
router.get('/', profilesController.home);

module.exports = router;
