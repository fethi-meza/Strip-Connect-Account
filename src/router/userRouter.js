const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();

router.get('/', UserController.getAllUsers);
router.post('/', UserController.createUser);

module.exports = router;
