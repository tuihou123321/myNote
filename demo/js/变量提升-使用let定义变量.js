let a=1;
function fn(){
    //存在暂时性死区，无法访问。因为let、const声明的变量，不会发生变量提升。如果使用var定义，a会显示为undefined
    console.log(a);
    let a=2;
}
fn();  //初始化前不能调用