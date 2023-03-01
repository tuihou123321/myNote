// console.log(NaN==NaN);  // false, NaN不等于任何值，包括它自己
// console.log(NaN===NaN); //false, NaN不等于任何值，包括它自己
//
// // 引用类型，比较的是地址，所以不相等。包括：数组，对象，函数
// console.log({}=={}) // false, {}是两个不同的对象，所以不相等
// console.log({}==={}) // false, {}是两个不同的对象，所以不相等
//
let a={};
let b=a;
console.log(a===b); // true, a和b指向同一个对象，所以相等


console.log('hello'=== new String('hello')); // false, 'hello'是字符串，new String('hello')是对象，所以不相等


console.log('1'==true);// true, '1'转换为数字1，true转换为数字1，所以相等
console.log('0'==false); // true, '0'转换为数字0，false转换为数字0，所以相等
console.log('0.0'==false); // true, '0.0'转换为数字0，false转换为数字0，所以相等
console.log('true'==true); // false, 'true'转换为数字NaN，true转换为数字1，所以不相等


console.log('1'===1); // false, '1'是字符串，1是数字，所以不相等