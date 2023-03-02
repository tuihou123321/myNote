const redis=require('other/redisDemo/2/redis')
const client=require('./redis')


client.hmset(["key", "test keys 1", "test val 1", "test keys 2", "test val 2"], function (err, res) {
    if(err){
        console.log('出错了',err);
    }else{
        console.log(res);
    }
});


