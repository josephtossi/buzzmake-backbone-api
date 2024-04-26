const express = require('express');
const router = express.Router();

router.post('/register', async (req, res, next) => {
    res.send('register');
});

router.post('/login', async (req, res, next) => {
    res.send('login');
});

router.post('/refresh-token', async (req, res, next) => {
    res.send('refresh token');
});

router.delete('/logout', async (req, res, next) => {
    res.send('register');
});

module.exports = router;