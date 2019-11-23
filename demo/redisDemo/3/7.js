const client=require('./redis')


client.hmset(`m`, {
    "/experts/10":'我是html文本内容'
});

client.del('m','/experts/10');

async function getData(){
    let clientData = await client.hmget(`m`, "/experts/10");
    console.log(clientData);
}

getData();


