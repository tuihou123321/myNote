const Koa = require('koa');
const router = require('koa-route');
const LRUCache=require('lru-cache')
const app = new Koa();
const URL=require('url')

/*
* 功能
* 1. 把请求的url存入缓存中
* 2. 通过特定参数清除缓存
* 3. 自定义设置缓存过期时间和最大缓存数量
* */

/*
* 设置缓存的时间和数据
* */
const ssrCache=new LRUCache({
    max:2,  //缓存的数量
    maxAge:1000*60  //缓存10s
})

/*
* 获取api数据
* */
function fetchApidata(ctx){
    let { url }=ctx;
    return `${url}最新值o ${new Date().getTime()}`;
}

/*
* 获取数据
* */
function getData(ctx){
    let { url }=ctx;
    let urlParams=URL.parse(url, true).query;
    let key=url.split('?')[0]
/*
* url上添加参数clearSSRCache可去掉缓存
* */
    if(urlParams.clearSSRCache){
        ssrCache.del(key);
    }

    let content;
    if(ssrCache.has(key)){
        content=ssrCache.get(key);
    }else{
        content=fetchApidata(ctx);
        //存入缓存
        ssrCache.set(key,content)
    }
    return content
}


const detail = ctx => {
    ctx.response.body = getData(ctx)
};


app.use(router.get('/detail/:id', detail));

app.listen(3001);
