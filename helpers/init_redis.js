const redis = require('redis');
var client = null;

process.setMaxListeners(15);

const connectToRedis = async (key, value) => {
    client = await redis.createClient()
        .on('error', err => console.log('Redis Client Error', err))
        .connect();
}

const redisSetKey = async (key, value, expirationTimeinSeconds) => {
    await client.set(key, value, 'EX', expirationTimeinSeconds);
}

const redisGetKey = async (key) => {
    return await client.get(key);
}

const redisDeleteKey = async (key) => {
    return await client.del(key);
}

module.exports.connectToRedis = connectToRedis;
module.exports.redisSetKey = redisSetKey;
module.exports.redisGetKey = redisGetKey;
module.exports.redisDeleteKey = redisDeleteKey;