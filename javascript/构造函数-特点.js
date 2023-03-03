// Function 构造函数参数说明
// 1. 参数列表 （可多个）
// 2. 函数体(最后一个参数)

let y=1;

function constructFunction() {
    let y =2;
  return new Function('return y');
}

console.log(constructFunction()());


