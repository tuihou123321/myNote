/*
* 路径拼接，使用node的path模块
* */
const path=require('path')
//如果没有传入resolve将返回当前目录的绝对路径
const newFilePath=path.resolve(__dirname,'dist/demo1.js')

/*
* 两个路径拼接，建议使用join
* */
const newFilePath2=path.join(__dirname,'dist/demo1.js')

console.log(newFilePath,newFilePath2);
