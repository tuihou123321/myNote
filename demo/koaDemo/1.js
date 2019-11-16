const Koa = require('koa');
const route = require('koa-route');
const app = new Koa();

const redirect = ctx => {
    ctx.response.redirect('/');
};

const index = ctx => {
    ctx.response.body = '我是首页';
};

const list = ctx => {
    ctx.response.body = '列表页';
};


const detail = ctx => {
    let { url }=ctx;
    ctx.response.body = `详情页,地址:${url}`;
};

app.use(route.get('/', index));
app.use(route.get('/list', list));
app.use(route.get('/detail/:id', detail));
app.use(route.get('/redirect', redirect));

// app.use();
app.listen(3001);
