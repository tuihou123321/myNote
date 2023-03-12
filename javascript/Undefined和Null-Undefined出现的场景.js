// 这是定义，却未赋值
let a;
console.log(a)


// 函数入参，未传入
function fn(a) {
    console.log(a)
}
fn();

// 函数没有返回值
function fn2() {}
console.log(fn2())

// 获取对象不存在的属性
let obj = {
    a: 1,
}
console.log(obj.b)

// 数组越界
let arr = [1, 2, 3]
console.log(arr[3])

