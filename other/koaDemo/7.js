const Koa = require('koa');
const router = require('koa-route');
const LRUCache=require('lru-cache')
const app = new Koa();
const URL=require('url')


/*
* 设置缓存的时间和数据
* */
const ssrCache=new LRUCache({
    max:20,  //缓存的数量
    maxAge:1000*60  //缓存10s
})


const showCache = ctx => {
     const total=ssrCache.length.toString();
     const keys=ssrCache.keys();
    // ctx.response.body = `当前缓存数量:${total}`
    ctx.response.body = keys
};

const detail = ctx => {
    let { url }=ctx;
    const content= `${url}最新值o ${new Date().getTime()}`;
    const key=url;
    const cacheHtml=  ssrCache.get(key);
    ctx.response.body = cacheHtml || content;
    console.log(cacheHtml,'后面执行');
    //如果没有就存入
    if(!ssrCache.has(key)){
        ssrCache.set(key,`内容是${key}`)
        console.log(ssrCache.get(key),'保存后的结果');
    }

};


app.use(router.get('/detail/:id', detail));
app.use(router.get('/cache', showCache));

app.listen(3001);
