// 判断变量不是数组的四种方法
function isArray(value) {
    // return value instanceof Array;
    // return Object.prototype.toString.call(value) === '[object Array]';
    // return value && value.constructor === Array; // 注意：constructor是可以被修改的，所以不是很可靠.判断constructor是否是Array，不是很可靠.null,undefined没有constructor属性，所以会报错
    return Array.isArray(value);
}

function typeOfValuePro(value) {
    // 因为null, array, object都是object类型，所以要单独判断
    if (value === null) {
        return 'null';
    }

   if (isArray()){
       return 'array';
   }
    return typeof value;
}

console.log(typeOfValuePro(/a/)); // regexp
console.log(typeOfValuePro(new Date())); // date
console.log(typeOfValuePro([])); // array
console.log(typeOfValuePro({})); // object
console.log(typeOfValuePro(1)); // number
console.log(typeOfValuePro('1')); // string
console.log(typeOfValuePro(true)); // boolean
console.log(typeOfValuePro(null)); // null
console.log(typeOfValuePro(undefined)); // undefined
console.log(typeOfValuePro(function(){})); // function
console.log(typeOfValuePro(Symbol())); // symbol
