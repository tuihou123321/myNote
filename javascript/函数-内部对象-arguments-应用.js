/*
* arguments 对象的运用
* 1. 入参(实参)个数的判断
* 2. 任意个数的参数处理
* */

// 面积计算
function fn(x,y, z) {
    // 通过arguments对象来判断参数个数是否符合规则
    if(arguments.length!==3){
        throw new Error('参数长度错误');
    }
    return x*y*z;
}

// console.log(fn(1,2,3));
// console.log(fn(1,2)); // 报错了，参数个数不对


// 处理任意个数的参数
// function joinStr(params) {
//     // 通过Array.from方法，把arguments类数组转成数组
//     const argumentsArray = Array.from(arguments);
//     // 去掉第一个入参
//     const newArray = argumentsArray.slice(1);
//     return newArray.join(params[0])
// }
//
// console.log(joinStr('-','a','b','c'))



function joinStr(params) {
    // 通过上面的slice方法，把params引用对象的值已经修改了
    const newArray = Array.prototype.slice.call(arguments,1);
    // 所以这里打印出来的params为截取后剩下的部分 -
    console.log(params)
    return newArray.join(params)
}

console.log(joinStr('-','a','b'))