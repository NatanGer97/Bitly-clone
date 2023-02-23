const Redis = require("redis");







const redis = Redis.createClient({
    host: "redis",
    port: 6379,
    
});

 const setIfNotExists = async (key, value) => {
    const exists = await redis.exists(key);
    if (!exists) {
        redis.set(key, value)
        .then((res) => {
            console.log(res);
            
        }).catch((err) => {
            console.log(err);
        });
    }
  
 };
redis.connect();

redis.on("error", (err) => {
    console.log("Error " + err);
});

redis.on("connect", () => {
    
    console.log("Connected to Redis");
});

module.exports = {redis, setIfNotExists}