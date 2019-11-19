const Koa = require('_koa@2.11.0@koa');
const router = require('_koa-route@3.2.0@koa-route');
const LRUCache=require('_lru-cache@5.1.1@lru-cache')
const app = new Koa();
const redis= require('redis')
const client=require('./redisClient');
const URL=require('url')


const clientPro= {
    get: function (key) {
        return new Promise(function (resolve, reject) {
            client.get(key, function (err, res) {
                if (err) {
                    console.log(">>>>> redis");
                    console.log("获取列表指定范围内的元素时出错。 错误码：" + err);
                    reject(false);

                } else {
                    // let data = JSON.parse(res);
                    resolve(res);
                }
            });
        })
    }
}


/*
* 获取api数据
* */
function fetchApidata(ctx){
    let { url }=ctx;
    //走react生命周期，编译html内容
    return `${url}最新值o ${new Date().getTime()}`;
}

/*
* 获取数据
* */
async function getData(ctx){
    let { url }=ctx;
    let urlParams=URL.parse(url, true).query;
    let key=url.split('?')[0]
    /*
    * url上添加参数clearSSRCache可去掉缓存
    * */
    if(urlParams.clearSSRCache) client.del(key);
    let content;  //要导出的内容
    //获取客户端的内容
    //这是异步的
    let cacheContent = await clientPro.get(key);
    if(cacheContent){
        content=cacheContent;
    }else{
        content=fetchApidata(ctx);
        //存入缓存
        client.set(key,content,redis.print)
    }
    ctx.response.body= content
}


app.use(router.get('/detail/:id', getData));

app.listen(3001);
