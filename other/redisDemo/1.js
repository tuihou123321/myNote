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
    },
    //老的测试环境
    "7": {
        host: "10.117.110.131",
        port: 6379,
        password: ""
    },
    //新的测试环境
    "8": {
        host: "172.16.65.85",
        port: 6379,
        password: ""
    },
    //生成环境
    "9": {
        host: "ydlredis",
        port: 7389,
        password: ""
    }
}

const redisConfig=redisConfigObject['1'];


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

// 1 键值对
client.set('color', 'red', redis.print);
client.get('color', function(err, value) {
    if (err) throw err;
    console.log('Got: ' + value)
    client.quit();
})
