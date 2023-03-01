
console.log(String("hello")===new String("hello").toString())
console.log(String("hello")===new String("hello").valueOf()) // valueOf返回对象的原始值

console.log(Number(1)===new Number(1).toString()); // 这里返回的是false，因为toString返回的是字符串
console.log(Number(1)===new Number(1).valueOf()); // 这里返回的是true，因为valueOf返回的是数字