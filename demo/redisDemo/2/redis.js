/*
* 引入redis
* */
const redis = require("redis");
const redisConfigObject=require('./config')
const env=require('./env')
const redisConfig=redisConfigObject[env.deploy];


// 创建redis服务
const client = redis.createClient(redisConfig.port, redisConfig.host, {});


// 设置密码
if(redisConfig.password){
    client.auth(redisConfig.password);
}

/**
 * 启动错误
 */
client.on("error", function(err) {
    console.log(">>>>> 链接redis服务错误，错误码: " + err);
    client.quit();
});

// 启动成功
client.on('ready', function() {
    console.log(">>>>> 链接redis服务器"+redisConfig.host+":"+redisConfig.port+"成功");
});

module.exports = client
