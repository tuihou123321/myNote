/*
*  isNaN 和 Number.isNaN 的区别？
* */
console.log(isNaN(1));  // false
console.log(isNaN('1')); // false, 自动做类型转换
console.log(isNaN('a')); // true，非数字，返回true
console.log('-----');


console.log(Number.isNaN(1));  // false
console.log(Number.isNaN('1')); // false
console.log(Number.isNaN('a')); // false
console.log('-----');


// Number.isNaN  相当于
function isNaNPro(value){
    return typeof value==='number' && isNaN(value);
}

console.log(isNaNPro(1));  // false
console.log(isNaNPro('1')); // false
console.log(isNaNPro('a')); // false


console.log('-----');
console.log(typeof isNaN);
