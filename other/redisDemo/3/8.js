const client=require('./redis')


//设置

const key='/experts/1001';
const html='我是html文本内容11';


client.hmset(`m`, {
    [key]:html
});

client.hmset(`m`, {
    '/experts/1002':'html文本二'
});

client.hmset(`m`, {
    '/experts/1003':'html文本二11'
});

async function getData(key){
    let clientData = await client.hmget(`m`,key);
    console.log(clientData);
}

getData(key);

// client.hdel(key,html)
//
// console.log(client.len('m'));

client.client.multi()
    .keys('*', function (err, replies) {
        console.log("MULTI got " + replies.length + " replies");
        let dbs = [replies];
        let dbData = {};
        replies.forEach(function (reply, index) {
            client.client.get(reply, function (err, data) {
                console.log(reply + " " +data);
            });
        });

    })
    .exec(function (err, replies) { });







