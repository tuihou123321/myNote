/* eslint new-cap: 0 no-eval: 0 */
const path = require('path')
const fs = require('fs-extra')
// Extract individual SVG files & generate index.js
// const indexFile = path.join(tmpPath, 'label.js')

const fileName='buildVariable.js';

module.exports = {
    //保存数组（数组内可以是对象，方法）
    saveBuildVariable(variable){
        const str="module.exports ={"+"variable:"+variable+"}";
        fs.outputFileSync(path.join(__dirname, fileName), str);
    },
    //保存对象为json文件
  getBuildVariable(){
      return  fs.readFileSync(fileName,'utf-8');
    }
}





