const express = require('express');
const PaymentController = require('../controllers/paymentController');
const router = express.Router();

router.post('/create-payment', PaymentController.createPayment);

module.exports = router;
