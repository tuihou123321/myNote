const redis=require('redis')
const client=require('./redis')

// 1 键值对
client.set('color', 'red');
client.set('color', 'green');
client.get('color', function(err, value) {
    if (err) throw err;
    console.log('Got1: ' + value)
    client.quit();
})


