const nodeLib = require('./nodeLib')

const timestamp=new Date().getTime();
nodeLib.saveBuildVariable(timestamp);

const fileContent=nodeLib.getBuildVariable()
console.log(fileContent);
