const { createClient } = require('redis');


const redis = createClient();

const connectRedis = async () => {
    await redis.connect();
    console.log('Redis connected');
}



module.exports.RedisService = { connectRedis }