// 判断构造函数是否是Array，
// console.log([].constructor===Array); // true
// console.log({}.constructor===Object); // true

// function fn() {
//     return 1;
// }
//
// console.log(fn.constructor===Function); // true



// 创建一个方法，判断变量类型，使用constructor判断
function typeOf(obj) {
    return obj.constructor;
}

console.log(typeOf(/a/), typeOf(/a/)===RegExp); // [Function: RegExp]
console.log(typeOf(new Date()), typeOf(new Date())===Date); // [Function: Date]
console.log(typeOf([]), typeOf([])===Array); // [Function: Array]
console.log(typeOf({}),typeOf({})===Object); // [Function: Object]
console.log(typeOf(1), typeOf(1)===Number); // [Function: Number]
console.log(typeOf('1'),typeOf('1')===String); // [Function: String]
console.log(typeOf(true),typeOf(true)===Boolean); // [Function: Boolean]
// console.log(typeOf(null)); // 特别说明：null没有constructor属性，所以会报错
// console.log(typeOf(undefined)); // undefined没有constructor属性，所以会报错
console.log(typeOf(function(){}),typeOf(function(){})===Function); // [Function: Function]


