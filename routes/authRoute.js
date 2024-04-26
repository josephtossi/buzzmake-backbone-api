const express = require('express');
const createError = require('http-errors');
const User = require('../models/userModel');
const router = express.Router();

// helpers constant
const authSchema = require('../helpers/validation_helper.js')

router.post('/register', async (req, res, next) => {
    try {
        const result = await authSchema.validateAsync(req.body);
        // check if user exist
        const userDoesExist = await User.findOne({ email: result.email });
        if (userDoesExist) throw createError.Conflict(`Could not register ${result.email}, user is already registered`);
        // add user to db
        const user = new User(result);
        const savedUser = await user.save();
        res.status(200).send({ message: `user ${result.email} created`, id: savedUser.id })
    } catch (error) {
        if (error.isJoi === true) error.status = 400
        next(error);
    }
});

// todo: login api
router.post('/login', async (req, res, next) => {
    res.send('login');
});

// todo: integrate redis
router.post('/refresh-token', async (req, res, next) => {
    res.send('refresh token');
});

// todo: delete api
router.delete('/logout', async (req, res, next) => {
    res.send('register');
});

module.exports = router;