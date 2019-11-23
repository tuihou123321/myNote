const redis=require('redis')
const client=require('./redis')

// 1 键值对
client.set('/ask/1', 'html 文本1');
client.set('/ask/2', 'html 文本2');
client.set('/ask/99', 'html 文本99');

client.del('/ask/1');

async function getData(){
    // const value =await  client.get('/ask/1')
    // console.log(value);
    // client.client.set('/ask/3', 'html 文本3',redis.print);


    //获取总长度
    // client.client.keys('*',function (err, replies) {
    //     console.log(replies);
    //     console.log(replies.length,'xz454');
    //     client.client.quit();
    // });


   //  const length=await client.length();
   // console.log(length);


     const keys=await client.keys();
    console.log(keys);
}

getData();

client.set('/ask/99', 'html 文本100');





