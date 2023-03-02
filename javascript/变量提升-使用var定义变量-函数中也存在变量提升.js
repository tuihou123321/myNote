function fn() {
    console.log(a); // 打印undefined，不会报错。因为函数中也存在变量提升
    var a=1;
}

fn();