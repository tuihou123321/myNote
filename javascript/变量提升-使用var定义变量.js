console.log(a);  // a显示为undefined，但是不会报错。因为变量提升
var a = 1;

//上面的代码等价于(先声明，后赋值)
var b;
console.log(b);
b=1;