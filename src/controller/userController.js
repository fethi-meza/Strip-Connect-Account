const UserService = require('');

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createUser(req, res) {
    const { email, firstName, lastName, phoneNumber, businessType, address } = req.body;
    try {
      const user = await UserService.createUser({ email, firstName, lastName, phoneNumber, businessType, address });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

//  getAllUsers method to fetch all users
  static async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await UserService.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateUser(req, res) {
    const { id } = req.params;
    const userData = req.body;
    try {
      const user = await UserService.updateUser(id, userData);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;
    try {
      await UserService.deleteUser(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }





}

module.exports = UserController;
