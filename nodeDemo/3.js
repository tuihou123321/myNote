/*
* 路径拼接，使用node的path模块
* */
const fs=require('fs-extra')
const path=require('path')
/*
* 两个路径拼接，建议使用join
* */
const newFilePath=path.join(__dirname,'dist/demo1.js')

/*
* 把内容输出到指定文件
* */
const str='hello world';

const obj={
    a:1,
    b:2
}



//使用异步的方式导出
fs.outputFileSync(newFilePath,"export const obj="+JSON.stringify(obj));



