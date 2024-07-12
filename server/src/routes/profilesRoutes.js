const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profilesController');

router.delete('/:id', profileController.deleteProfile)
router.put('/:id', profileController.updateProfile)
router.post('/', profileController.createProfile)
router.get('/', profileController.getAllProfiles);

module.exports = router;
