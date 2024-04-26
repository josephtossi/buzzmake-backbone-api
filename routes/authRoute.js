const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js')

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/refresh-token', authController.refreshToken);

// todo: integrate redis and try blacklisting tokens
router.delete('/logout', authController.logout);

module.exports = router;