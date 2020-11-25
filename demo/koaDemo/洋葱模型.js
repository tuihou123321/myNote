const Koa=require('koa');

//应用程序
const app=new Koa();

//中间件1
app.use((ctx,next)=>{
    console.log(1);
    next();
    console.log(2);
})

//中间件2
app.use((ctx,next)=>{
    console.log(3);
    next();
    console.log(4);
})

app.listen(9000,'127.0.0.1',()=>{
 console.log('server is starting');
})

//输出的结果：1,3,4,2

/*
* 在koa中间件中，能过next函数，将中间件分成了两部分
*
*
* */
