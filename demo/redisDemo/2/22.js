const redis=require('redis')
const client=require('./redis')



/*
* hmset 返回的是一个数组
* */
client.hmget('m', '/experts/1', function(err, res){
    if (err) {
        console.log("获取列表指定范围内的元素时出错。 错误码："+ err);
    } else {
        console.log(res,res.length);  //如果没有数据[]内长度是1，值是null
    }
});
