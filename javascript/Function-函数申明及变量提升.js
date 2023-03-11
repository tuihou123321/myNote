fn1(); // 1
console.log(fn2); // undefined
console.log(fn3); // 报错：未初始化的变量

function fn1() {
    console.log(1)
}

var fn2 = function () {
    console.log(2)
}

const fn3 = function () {
    console.log(3)
}

