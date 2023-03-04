//let 可以创建词法作用域, 但是var不行.
// 词法作用域是指作用域是在写代码或者说定义的时候决定的, 而不是在运行的时候决定的.
// 词法作用域是静态作用域, 而动态作用域是在运行的时候决定的.
for (let i=0;i<3;i++){
    setTimeout(function (){
        console.log(i);
    },0)
}
// 0,1,2


//var 没有创建词法作用域
for (var i=0;i<3;i++){
    setTimeout(function (){
        console.log(i);
    },0)
}
// 3,3,3