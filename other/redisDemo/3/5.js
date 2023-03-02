const redis=require('other/redisDemo/3/redis')
const client=require('./redis')


const key='/experts/1000';
const html='我是html文本内容';


client.hmset(`m`, {
    [key]:html
});


async function getData(key){
    let clientData = await client.hmget(`m`,key);
    console.log(clientData);
}

getData("/experts/1000");





