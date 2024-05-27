const express = require('express');
const router = express.Router();

const materialController = require('../app/controllers/MaterialController');
router.get('/search',materialController.search);
router.get('/', materialController.home);

module.exports = router;
