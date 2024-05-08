const jwt = require('jsonwebtoken');
const createError = require('http-errors');

// const helpers  
const redisClient = require('./init_redis.js');

module.exports = {
    singAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {}
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: "1h",
                issuer: "joseph.com",
                audience: userId
            };
            jwt.sign(payload, secret, options, (err, token) => {
                if (err) return reject(err);
                resolve(token);
            });
        })
    },
    verifyAccessToken: (req, res, next) => {
        if (!req.headers['authorization']) return next(createError.Unauthorized());
        const authorizationHeader = req.headers['authorization'];
        const bearerToken = authorizationHeader.split(' ');
        const token = bearerToken[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) return next(createError.Unauthorized())
            req.payload = payload;
            req.userId = payload.aud;
            next();
        });
    },
    signRefreshToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {}
            const secret = process.env.REFRESH_TOKEN_SECRET;
            const options = {
                expiresIn: "1y",
                issuer: "joseph.com",
                audience: userId
            };
            jwt.sign(payload, secret, options, (err, token) => {
                if (err) return reject(err);
                // set token to redis on each login
                redisClient.redisSetKey(userId, token, 365 * 24 * 60 * 60);
                resolve(token);
            });
        })
    },
    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, payload) => {
                if (err) return reject(createError.Unauthorized());
                const userId = payload.aud;
                const token = await redisClient.redisGetKey(userId);
                // check if the refresh token is saved in redis
                if (token === refreshToken) {
                    resolve(userId);
                } else {
                    reject(createError.Unauthorized());
                }
            });
        })
    },
}