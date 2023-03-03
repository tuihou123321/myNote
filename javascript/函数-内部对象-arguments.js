/*
* arguments介绍
* arguments是一个类数组对象，包含了函数的参数，可以通过arguments.length来获取参数的个数，通过arguments[i]来获取第i个参数
* */

function fn() {
    console.log(arguments); // { '0': 'a', '1': 'b' }, arguments是一个类数组对象
    console.log(arguments.length); // 2
    console.log(arguments[0]); // 可以通过索引值访问， 'a'
}

fn('a','b');




function fn2(val1, val2) {
    // 虽然fn2只默认接收两个参数，但是通过arguments可以获取到实际传递的参数。所以arguments长度为3.
    console.log(arguments);  // { '0': 'a', '1': 'b', '2': 'c' }
}

fn2('a','b', 'c');