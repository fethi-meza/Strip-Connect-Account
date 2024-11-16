const prisma = require('../pisma/prismaClient'); 

class UserService {
  // getAllUsers method to fetch all users
  static async getAllUsers() {
    try {
      return await prisma.user.findMany();
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  }
// createUser method to create a new user
  static async createUser(userData) {
    try {
      return await prisma.user.create({
        data: userData,
      });
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }
// getUserById method to fetch a user by id
  static async getUserById(userId) {
    try {
      return await prisma.user.findUnique({
        where: {
          id: parseInt(userId),
        },
      });
    } catch (error) {
      throw new Error('Error fetching user: ' + error.message);
    }
  }
  // updateUser method to update a user
  static async updateUser(userId, userData) {
    try {
      return await prisma.user.update({
        where: {
          id: parseInt(userId),
        },
        data: userData,
      });
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  }
  // deleteUser method to delete a user by id
  static async deleteUser(userId) {
    try {
      return await prisma.user.delete({
        where: {
          id: parseInt(userId),
        },
      });
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  }
}

module.exports = UserService;
