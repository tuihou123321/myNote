const redis=require('redis')
const client=require('./redis')

/*
* hmset与hset的区别
* hmget返回值array，hget返回值string
* */
client.hmset("/ask/detail", {
    uid:100,
    accessToken:2000
});


