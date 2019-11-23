const redis=require('redis')
const client=require('./redis')

/*
* hmset与hset的区别
* hmget返回值array，hget返回值string
* */
client.hmset("/ask/detail", "/ask/detail/1", "问答内容一");
client.hmset(["/ask/detail", "/ask/detail/2", "问答内容二"]);

/*
* hmset 返回的是一个数组
* */
client.hmget('/ask/detail', '/ask/detail/2').then(res=>{
    console.log(res);
})

let a= client.hmset('/ask/detail','/ask/detail/1');

