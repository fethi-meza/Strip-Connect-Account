const AccountService = require('../services/AccountService');

class AccountController {
  static async createAccount(req, res) {
    const { tokenId, userId, country, addressIp, data } = req.body;
    try {
      const accountId = await AccountService.createAccount(tokenId, userId, country, addressIp, data);
      res.status(201).json({ accountId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async getAccount(req, res) {
  const { accountId } = req.params;
  try {
    const account = await AccountService.getAccount(accountId);
    res.status(200).json({ account });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

static async updateAccount(req, res) {
  const { accountId } = req.params;
  const data = req.body;
  try {
    const account = await AccountService.updateAccount(accountId, data);
    res.status(200).json({ account });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

static async deleteAccount(req, res) {
  const { accountId } = req.params;
  try {
    await AccountService.deleteAccount(accountId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// getAllAccounts method to fetch all accounts
static async getAllAccounts(req, res) {
  try {
    const accounts = await AccountService.getAllAccounts();
    res.status(200).json({ accounts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// getAccountsByUserId method to fetch accounts by user id
static async getAccountsByUserId(req, res) {
  const { userId } = req.params;
  try {
    const accounts = await AccountService.getAccountsByUserId(userId);
    res.status(200).json({ accounts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//createAccountLoginLink method to create an account login link
static async createAccountLoginLink(req, res) {
  const { accountId } = req.params;
  try {
    const accountLink = await AccountService.createAccountLoginLink(accountId);
    res.status(201).json({ accountLink });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}






}
module.exports = AccountController;
