const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController.js')
const { verifyAccessToken } = require('../helpers/jwt_helper.js')

router.get('/', verifyAccessToken, userController.getUsers);
router.get('/:id', verifyAccessToken, userController.getUser);
router.get('/buzzes/:id', verifyAccessToken, userController.getUserBuzzes);

module.exports = router;