const express = require('express');
const AccountController = require('../controllers/accountController');
const router = express.Router();

router.post('/create-account', AccountController.createAccount);

module.exports = router;
