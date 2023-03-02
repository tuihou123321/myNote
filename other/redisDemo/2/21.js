const redis=require('other/redisDemo/2/redis')
const client=require('./redis')

/*
* hset大规模数据下比set性能高
* 原因：先定位区域再查找指定值
* */
client.hset("/experts/detail", "/experts/detail/1", "html内容一", redis.print);
client.hset(["/experts/detail", "/experts/detail/2", "html内容二"], redis.print);


client.hget('/experts/detail', '/experts/detail/2', function(err, res){
    if (err) {
        console.log("获取列表指定范围内的元素时出错。 错误码："+ err);
    } else {
       console.log(res);
    }
});
