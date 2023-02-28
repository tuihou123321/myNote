// 说明：因为引用数据类型都会直接或间接继承自Object,因此它们都有Object的原型方法，都包含toString方法.
// 不同数据类型的toString()方法返回的结果不同,所以通过toString函数可以判断不同数据类型。


// console.log(Object.prototype.toString.call([1])); // [object Array] 数组
// console.log(Object.prototype.toString.call({a:1})) //  [object Object]  对象
// console.log(Object.prototype.toString.call(function a(){return 11})) //  [object Function] 函数
// console.log(Object.prototype.toString.call(/^[0-9]{12}$/)) //  [object RegExp] 正则
console.log(Object.prototype.toString.call(new Date())) //  [object Date] 日期对象



function typeOf(obj) {
    const type = Object.prototype.toString.call(obj).slice(8, -1);
    return type.toLowerCase();
}

console.log(typeOf(/a/)); // regexp
console.log(typeOf(new Date())); // date
console.log(typeOf([])); // array
console.log(typeOf({})); // object
console.log(typeOf(1)); // number
console.log(typeOf('1')); // string
console.log(typeOf(true)); // boolean
console.log(typeOf(null)); // null
console.log(typeOf(undefined)); // undefined
console.log(typeOf(function(){})); // function