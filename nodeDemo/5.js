/*
* 路径拼接，使用node的path模块
* */
const fs=require('fs-extra')
const path=require('path')



//使用异步的方式读取文件夹中的文件，返回一个数组，包含文件夹中所有的文件名
let data=fs.readdirSync(path.join(__dirname, 'dist'));

console.log(data);



