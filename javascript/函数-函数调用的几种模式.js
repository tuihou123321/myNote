/*
* 函数调用的模式有五种：
* 1.方法调用模式
* 2.函数调用模式
* 3.构造器调用模式
* 4.apply, call调用模式
* 5.匿名函数调用模式
* */

// 1.方法调用模式
// 当一个函数被保存为对象的一个属性时，我们称它为一个方法。当一个方法被调用时，this被绑定到该对象。
const myObject = {
    value: 0,
    increment: function (inc) {
        this.value += typeof inc === 'number' ? inc : 1;
    }
}
myObject.increment();

// 2.函数调用模式
// 当一个函数并非一个对象的属性时，那么它就是被当做一个函数来调用的。在这种情况下，this被绑定到全局对象。
function add(a, b) {
    return a + b;
}
add(3, 4);

// 3.构造器调用模式
// 如果在一个函数前面加上new前缀，那么背地里将会创建一个连接到该函数的prototype成员的新对象，同时this会被绑定到那个新对象上。
function Quo(string) {
    this.status = string;
}
Quo.prototype.get_status = function () {
    return this.status;
}
const myQuo = new Quo('confused');
console.log(myQuo.get_status());

// 4.apply调用模式
// apply方法让我们构建一个参数数组传递给调用函数。它也允许我们选择this的值。apply方法接受两个参数：一个是在其中运行函数的作用域，另一个是参数数组。
const sum = add.apply(null, [3, 4]);
console.log(sum);
// call调用
const sum2 = add.call(null,1,2);
console.log(sum2);

// 5.匿名函数调用模式
// 匿名函数并不是一个对象，因此它不能拥有方法，但是它可以使用call方法，它的第一个参数也是this的值。

// sum2是一个匿名函数，只是把函数返回给了sum2,并没有定义名称
// const sum2=function (num1, num2){
//     return num1+num2;
// }
//
// console.log(sum2(1,2));
//
// (function sum(num1, num2){
//     console.log(num1 + num2);
// })(1,2)