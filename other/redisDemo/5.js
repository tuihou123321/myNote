/*
* 引入redis
* */
const redis = require("redis");

const redisConfigObject= {
    //本地安装redis,启动的服务
    "0": {
        host: "127.0.0.1",
        port: 6379,   //本地安装redis默认端口
        password: ""
    },
    //本地开发
    "1": {
        host: "47.96.108.48",
        port: 9389,   //本地安装redis默认端口
        password: "P01bGbsxc59B(aYHgTEr(%PuGK^TRoZv"
    }
}

const redisConfig=redisConfigObject['1'];


// 创建redis服务
const client = redis.createClient(redisConfig.port, redisConfig.host, {});


// 设置密码
if(redisConfig.password){
    client.auth(redisConfig.password);
}


client.set("string key", "string val", redis.print);
client.hset("hash key", "hashtest 1", "some value", redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], redis.print);

//清空的有
// client.flush;
// client.flushall();

client.hkeys("m", function (err, replies) {
    console.log(`总长度为:${replies.length}`);
    // replies.forEach(function (reply, i) {
    //     console.log("    " + i + ": " + reply);
    // });
    client.quit();
});
