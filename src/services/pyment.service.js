const prisma = require('../pisma/prismaClient.js'); 
const privateStripe = require('./../utils/stripeClient.js'); 

class PaymentService {
  static async createPayment(userId, amount, currency) {
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user) {
        throw new Error('User not found');
      }

      const paymentIntent = await privateStripe.paymentIntents.create({
        amount,
        currency,
        payment_method_types: ['card'],
        receipt_email: user.email,
      });

      await prisma.payment.create({
        data: {
          userId,
          amount,
          currency,
          paymentIntentId: paymentIntent.id,
          status: 'pending',
        },
      });

      return paymentIntent;
    } catch (error) {
      throw new Error('Error creating payment: ' + error.message);
    }
  }

  static async updatePaymentStatus(paymentIntentId, status) {
    try {
      await prisma.payment.updateMany({
        where: { paymentIntentId },
        data: { status },
      });
    } catch (error) {
      throw new Error('Error updating payment status: ' + error.message);
    }
  }
  // getAllPayments method to fetch all payments
  static async getAllPayments() {
    try {
      return await prisma.payment.findMany();
    } catch (error) {
      throw new Error('Error fetching payments: ' + error.message);
    }
  }
  // getPaymentById method to fetch a payment by id
  static async getPaymentById(paymentId) {
    try {
      return await prisma.payment.findUnique({
        where: {
          id: parseInt(paymentId),
        },
      });
    } catch (error) {
      throw new Error('Error fetching payment: ' + error.message);
    }
  }
  // getPaymentsByUserId method to fetch payments by user id
  static async getPaymentsByUserId(userId) {
    try {
      return await prisma.payment.findMany({
        where: {
          userId: parseInt(userId),
        },
      });
    } catch (error) {
      throw new Error('Error fetching payments: ' + error.message);
    }
  }
  // deletePayment method to delete a payment by id
  static async deletePayment(paymentId) {
    try {
      return await prisma.payment.delete({
        where: {
          id: parseInt(paymentId),
        },
      });
    } catch (error) {
      throw new Error('Error deleting payment: ' + error.message);
    }
  }

  // createPaymentLink method to create a payment link
  static async createPaymentLink(paymentIntentId) {
    try {
      const link = await privateStripe.paymentIntents.createPaymentMethod({
        payment_intent: paymentIntentId,
        type: 'card',
      });

      return link;
    } catch (error) {
      throw new Error('Error creating payment link: ' + error.message);
    }
  }
  // getPaymentLink method to fetch a payment link
  static async getPaymentLink(paymentIntentId) {
    try {
      return await privateStripe.paymentIntents.retrievePaymentMethod(paymentIntentId);
    } catch (error) {
      throw new Error('Error fetching payment link: ' + error.message);
    }
  }
  // confirmPayment method to confirm a payment
  static async confirmPayment(paymentIntentId) {
    try {
      return await privateStripe.paymentIntents.confirm(paymentIntentId);
    } catch (error) {
      throw new Error('Error confirming payment: ' + error.message);
    }
  }
  // cancelPayment method to cancel a payment
  static async cancelPayment(paymentIntentId) {
    try {
      return await privateStripe.paymentIntents.cancel(paymentIntentId);
    } catch (error) {
      throw new Error('Error canceling payment: ' + error.message);
    }
  }
  
}

module.exports = PaymentService;
