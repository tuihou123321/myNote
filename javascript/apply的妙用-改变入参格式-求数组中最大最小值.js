const arr=[1,2,3]
// 原本Max的写法
console.log(Math.max(1,2,3))
console.log(Math.max(...arr))  // 也可以使用es6中的数组解构方法

// math.max原本接收的参数是一个个的数字，但是apply和call可以改变入参格式
// apply虽然接收的是一个数组，但是传递给函数apply时，数组会被展开
console.log(Math.max.apply(null ,arr)); // 等价于 Math.max(1,2,3)

// call和apply的区别，apply接收的是一个数组，call接收的是一个个的参数
// 虽然call接收的是一个个的参数，但是传递给函数call时，参数会被展开
console.log(Math.max.call(null ,...arr)); // 等价于 Math.max.call(null ,1,2,3)
