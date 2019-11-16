const Koa = require('koa');
const router = require('koa-route');
const LRUCache=require('lru-cache')
const app = new Koa();
const URL=require('url')
const Api=require('./api')

/*
* 功能
* 1. 把请求的url存入缓存中
* 2. 通过特定参数清除缓存clearSSRCache
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
async function getDetailHtml(ctx){
    let { url }=ctx;
    let urlParams=URL.parse(url, true).query;
    let {id}=urlParams;
    let result;
    result=await Api.fetchDetailData({id});
    return result;
    // return `${url}最新值o ${new Date().getTime()}`;
}

/*
* 获取html内容
* */
async function getHtml(ctx,pagepath){
    // let { url }=ctx;
    // let urlParams=URL.parse(url, true).query;
    let result;
    try{
        result= await getDetailHtml();
    }catch (e) {
        result='出错了'
        console.log(e);
    }
    return result
}

async function renderAndCache(ctx,pagepath){
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
        content=await getHtml();
        //如果请求成功，才存入缓存
        // ssrCache.set(key,content)
    }
    // console.log(content,120);
    ctx.response.body = content
};


app.use(router.get('/detail/:id', ctx => renderAndCache(ctx,'/detail/:id')));

app.listen(3001);
