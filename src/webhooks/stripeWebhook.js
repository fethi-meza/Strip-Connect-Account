const express = require('express');
const PaymentService = require('../services/pyment.service');
const router = express.Router();

router.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const event = JSON.parse(req.body);

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        await PaymentService.updatePaymentStatus(paymentIntent.id, 'completed');
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).send();
  } catch (error) {
    res.status(400).send(`Webhook error: ${error.message}`);
  }
});

module.exports = router;
