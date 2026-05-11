const { createClient } = require('redis');


const redis = createClient({
    url: "redis://redis_db:6379"
});

redis.on('error', (err) => console.log('Redis Client Error', err));

const connectRedis = async () => {
    await redis.connect();
    console.log('Redis connected');
}

const saveCount = async (key, count) => {
    await redis.set(key, count);
}

const saveObject = async (key, object) => {
    await redis.set(key, JSON.stringify(object));
}

const getObject = async (key) => {
    return JSON.parse(await redis.get(key))
}

const getCount = async (key) => {
    return await redis.get(key)
}


module.exports.RedisService = { redis, connectRedis, saveCount, getCount, saveObject, getObject }