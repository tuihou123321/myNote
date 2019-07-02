const http=require('http');
const URL=require('url');
const querystring=require('querystring');
const { configure,getLogger }=require('log4js')
const log=getLogger();

//为错误等级分类
configure({
    appenders:{
        cheese:{
            type:'file',filename:'log/cheese.log'
        }
    },
    categories:{
        default:{
            appenders:['cheese'],
            level:'all'
        }
    }
})

// import {login} from './data/login'

//允许跨域的地址
const allowOrigin={
    'http://localhost':true,
    'http://localhost:63342':true,
    'http://abc.com':true
}

const home={
    lists:[
        {
            name:"xiaoming"
        },{
        name:"xiaohong"
        }
    ],
    total:20
}

const login={
    account:"xiaozuo",
    password:123456
}

http.createServer((req,res)=>{
    let {url={}}=req;
    let { origin }=req.headers;
    // console.log(origin,2000);
    if(allowOrigin[origin]){
        res.setHeader('access-control-allow-origin','*');
    }
    res.writeHead(200,{'Content-Type':'text/plain'});
    let data="null";
    //获取url的字符串格式数据；
    let {arg,pathname}=URL.parse(req.url);
    //把string:arg 转换成 object;
    let urlParams=querystring.parse(arg) || {};
    console.log(pathname,220);
    if(pathname==="/login"){
        data=login;
    }else if(pathname==="/home"){
        home.page=urlParams.page;
        home.pageSize=urlParams.pageSize;
        data=home;
    }
    console.log("data",data);
    log.trace(data);
    log.debug(data);
    log.info(data);
    log.warn(data);
    log.error(data);
    log.fatal(data);
    res.end(JSON.stringify(data));
}).listen(8080);
