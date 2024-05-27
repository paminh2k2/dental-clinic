const express = require('express');
const router = express.Router();

const expenseController = require('../app/controllers/ExpenseController');
router.get('/search', expenseController.search);
router.get('/', expenseController.home);

module.exports = router;
