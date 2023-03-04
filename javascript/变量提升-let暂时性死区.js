// var中存在变量提升
console.log(a); // undefined
var a=1;

// let中不存在变量提升
console.log(b); // 引用错误：初始化之前不能使用
let b=1;