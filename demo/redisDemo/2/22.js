const redis=require('redis')
const client=require('./redis')

/*
* hmset与hset的区别
* hmget返回值array，hget返回值string
* */
client.hmset("/ceshi/result", "/ceshi/result/1", "结果页内容一", redis.print);
client.hmset(["/ceshi/result", "/ceshi/result/2", "结果页内容二"], redis.print);

/*
* hmset 返回的是一个数组
* */
client.hmget('/ceshi/result', '/ceshi/result/2', function(err, res){
    if (err) {
        console.log("获取列表指定范围内的元素时出错。 错误码："+ err);
    } else {
       console.log(res);
    }
});


/*
* hmset 返回的是一个数组
* */
client.hmget('/ceshi/result', '/ceshi/result/555', function(err, res){
    if (err) {
        console.log("获取列表指定范围内的元素时出错。 错误码："+ err);
    } else {
        console.log(res,res.length);  //如果没有数据[]内长度是1，值是null
    }
});


/*
* hmset 返回的是一个数组
* */
client.hmget('/ceshi', '/ceshi/result/555', function(err, res){
    if (err) {
        console.log("获取列表指定范围内的元素时出错。 错误码："+ err);
    } else {
        console.log(res,res.length);  //如果没有数据[]内长度是1，值是null
    }
});
