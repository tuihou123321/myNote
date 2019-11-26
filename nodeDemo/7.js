const path = require('path')
const fs = require('fs-extra')

//初始化数据
const fileName='buildVariable.js';
const timestamp=new Date().getTime();
const str=`{"variable":${timestamp}}`;


//写入
fs.outputFileSync(path.join(__dirname, `config/${fileName}.js`), str);

//读取
const content=fs.readFileSync(path.join(__dirname, `config/${fileName}.js`),'utf-8');

console.log(content,typeof content);

const contentObject=JSON.parse(content)

console.log(contentObject,contentObject.variable);
