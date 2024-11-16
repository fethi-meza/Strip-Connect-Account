const prisma = require('./../pisma/prismaClient'); 
const privateStripe = require('../utils/stripeClient.js'); 

class AccountService {
  static async createAccount(tokenId, userId, country, addressIp, data) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { address: true },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const accountData = {
        type: 'custom',
        email: user.email,
        country,
        requested_capabilities: ['card_payments', 'transfers', 'legacy_payments'],
        external_account: tokenId,
        business_profile: {
          url: user.businessProfile || 'https://www.userbusinesswebsite.com',
          product_description: 'Services provided',
          name: `${user.firstName} ${user.lastName}`,
        },
        tos_acceptance: {
          date: Math.floor(Date.now() / 1000),
          ip: addressIp,
        },
      };

      if (user.businessType === 'individual') {
        accountData.individual = {
          email: user.email,
          first_name: user.firstName,
          last_name: user.lastName,
          phone: user.phoneNumber,
          relationship: { title: data.title },
          id_number: data.idNumber,
          dob: {
            day: user.birthDate.getDate(),
            month: user.birthDate.getMonth() + 1,
            year: user.birthDate.getFullYear(),
          },
          address: user.address,
          verification: {
            proof_of_liveness: data.proofOfLiveness,
            document: data.verificationDocument,
          },
        };
      } else if (user.businessType === 'company') {
        accountData.company = {
          name: data.companyName,
          tax_id: data.taxId,
          phone: user.phoneNumber,
          address: user.address,
          directors_provided: true,
          executives_provided: true,
        };
      }

      const account = await privateStripe.accounts.create(accountData);
      return account.id;
    } catch (error) {
      throw new Error('Error creating account: ' + error.message);
    }
  }


    // getAccountById method to fetch an account by id
  static async getAccountById(accountId) {
    try {
      return await privateStripe.accounts.retrieve(accountId);
    } catch (error) {
      throw new Error('Error fetching account: ' + error.message);
    }
  }
  // updateAccount method to update an account
  static async updateAccount(accountId, data) {
    try {
      return await privateStripe.accounts.update(accountId, data);
    } catch (error) {
      throw new Error('Error updating account: ' + error.message);
    }
  }
  // deleteAccount method to delete an account by id
  static async deleteAccount(accountId) {
    try {
      return await privateStripe.accounts.del(accountId);
    } catch (error) {
      throw new Error('Error deleting account: ' + error.message);
    }
  }
  // getAllAccounts method to fetch all accounts
  static async getAllAccounts() {
    try {
      return await privateStripe.accounts.list();
    } catch (error) {
      throw new Error('Error fetching accounts: ' + error.message);
    }
  }
  // getAccountsByUserId method to fetch accounts by user id
  static async getAccountsByUserId(userId) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error('User not found');
      }

      return await privateStripe.accounts.list({ email: user.email });
    } catch (error) {
      throw new Error('Error fetching accounts: ' + error.message);
    }
  }
  // createAccountLink method to create an account link
  static async createAccountLink(accountId) {
    try {
      return await privateStripe.accountLinks.create({
        account: accountId,
        refresh_url: 'https://www.refreshurl.com',
        return_url: 'https://www.returnurl.com',
        type: 'account_onboarding',
      });
    } catch (error) {
      throw new Error('Error creating account link: ' + error.message);
    }
  }
  // createAccountLoginLink method to create an account login link
  static async createAccountLoginLink(accountId) {
    try {
      return await privateStripe.accounts.createLoginLink(accountId);
    } catch (error) {
      throw new Error('Error creating account login link: ' + error.message);
    }
  }
}

module.exports = AccountService;
