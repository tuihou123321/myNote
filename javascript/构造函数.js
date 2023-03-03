// Function 构造函数参数说明
// 1. 参数列表 （可多个）
// 2. 函数体(最后一个参数)


const add = new Function('a', 'b', 'return a + b');
const add2 = new Function('a', 'b','c', 'return a + b+c');
const add3 = new Function('a', 'b', 'return "计算结果为" + (a + b)');

// console.log(add(1,2)); // 3
// console.log(add2(1,2,3)); // 6
// console.log(add3(1,2));