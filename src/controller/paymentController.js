const PaymentService = require('../services/PaymentService');

class PaymentController {
  static async createPayment(req, res) {
    const { userId, amount, currency } = req.body;
    try {
      const payment = await PaymentService.createPayment(userId, amount, currency);
      res.status(201).json(payment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //get  all payments method to fetch all payments
 static async getPayments(req, res) {
    try {
      const payments = await PaymentService.getPayments();
      res.status(200).json(payments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
// getPayment method to fetch a payment by id
  static async getPayment(req, res) {
    const { paymentId } = req.params;
    try {
      const payment = await PaymentService.getPaymentById(paymentId);
      res.status(200).json(payment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // deletePayment : method to delete a payment by id
  static async deletePayment(req, res) {
    const { paymentId } = req.params;
    try {
      await PaymentService.deletePayment(paymentId);
      res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // getPaymentLink method to fetch payment link
  static async getPaymentLink(req, res) {
    const { paymentId } = req.params;
    try {
      const paymentLink = await PaymentService.getPaymentLink(paymentId);
      res.status(200).json(paymentLink);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //confirmPayment method to confirm payment
  static async confirmPayment(req, res) {
    const { paymentId } = req.params;
    try {
      const payment = await PaymentService.confirmPayment(paymentId);
      res.status(200).json(payment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
//cancelPayment method to cancel payment
  static async cancelPayment(req, res) {
    const { paymentId } = req.params;
    try {
      const payment = await PaymentService.cancelPayment(paymentId);
      res.status(200).json(payment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }



}

module.exports = PaymentController;
