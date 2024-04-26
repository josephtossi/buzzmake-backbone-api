const express = require('express');
const createError = require('http-errors');
const User = require('../models/userModel');
const router = express.Router();

// helpers constant
const { authSignInShema, authSignUpShema } = require('../helpers/validation_helper.js');
const jwtHelper = require('../helpers/jwt_helper.js');

router.post('/register', async (req, res, next) => {
    try {
        const result = await authSignUpShema.validateAsync(req.body);
        // check if user exist
        const userDoesExist = await User.findOne({ email: result.email });
        if (userDoesExist) throw createError.Conflict(`Could not register ${result.email}, user is already registered`);
        // add user to db
        const user = new User(result);
        const savedUser = await user.save();
        const accessToken = await jwtHelper.singAccessToken(savedUser.id);
        const refreshToken = await jwtHelper.signRefreshToken(savedUser.id);
        res.status(200).send({
            message: `user ${result.email} created`,
            id: savedUser.id,
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    } catch (error) {
        if (error.isJoi === true) error.status = 400
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const result = await authSignInShema.validateAsync(req.body);
        // check if user already signed up
        const userDoesExist = await User.findOne({ email: result.email });
        if (!userDoesExist) throw createError.Conflict(`${result.email} not yet registered`);
        // check password if correct
        const passwordMatch = await userDoesExist.isValidPassword(result.password);
        if (!passwordMatch) throw createError.Unauthorized('Username/password is not valid');

        const accessToken = await jwtHelper.singAccessToken(userDoesExist.id);
        const refreshToken = await jwtHelper.signRefreshToken(userDoesExist.id);
        res.status(200).send({
            message: `welcome ${result.email}`,
            id: result.id,
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    } catch (error) {
        if (error.isJoi === true) return next(createError.BadRequest('Email or password format is not correct'))
        next(error);
    }
});

// todo: integrate redis and try blacklisting refresh tokens
router.post('/refresh-token', async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) throw createError.BadRequest('Please add the refresh token');
        const userId = await jwtHelper.verifyRefreshToken(refreshToken);

        const accessToken = await jwtHelper.singAccessToken(userId);
        const newRefreshToken = await jwtHelper.signRefreshToken(userId);

        res.status(200).send({
            id: userId,
            accessToken: accessToken,
            refreshToken: newRefreshToken
        });
    } catch (error) {
        next(error);
    }
});

// todo: delete api
router.delete('/logout', async (req, res, next) => {
    res.send('register');
});

module.exports = router;