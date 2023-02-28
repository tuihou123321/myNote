// 使用instanceof判断数据类型
// 语法：obj instanceof constructor
// console.log([] instanceof Array); // true
// console.log([] instanceof Object); // true  // 数组即是数组，也是对象。所以无法直接使用instanceof来判断数组,因为数组是对象的子类,所以数组也是对象


function getDataType(value) {
    if (value instanceof Array){
        return 'Array';
    }else if(value instanceof Object){
        return 'Object';
    }
    return 'value不是数组也不是对象';
}

console.log(getDataType([])); // Array
console.log(getDataType({})); // Object