const redis=require('redis')
const client=require('./redis')

// 1 键值对
client.set('color', 'red', redis.print);
client.get('color', function(err, value) {
    if (err) throw err;
    console.log('Got: ' + value)
    client.quit();
})


