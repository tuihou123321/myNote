/*
* 1. Iterator介绍
* 2. Iterator的作用
* 3. Iterator的遍历过程
* 4. 字符串的Iterator接口
* 5. Iterator接口与Generator函数
* 6. 遍历的应用
* 7. 遍历器对象的return()，throw()
* 8. for...of循环
* 9. for...of循环与数组的遍历
* 10. for...of循环与Set和Map的遍历
* */


// 1. Iterator介绍
// Iterator的作用有三个：
// 一是为各种数据结构，提供一个统一的、简便的访问接口；
// 二是使得数据结构的成员能够按某种次序排列；
// 三是ES6创造了一种新的遍历命令for...of循环，Iterator接口主要供for...of消费。

// 使用for of循环遍历数组
// for of和for in的区别
// for of遍历的是数组的元素
// for in遍历的是数组的索引
let arr = ['a','b', 'c'];
for (let v of arr) {
    console.log(v);
}
for (let v in arr) {
    console.log(v);
}

