let name='zhangsan';
window.name='lisi';

function person() {
    this.name='wangwu';
}
// person内部的this指向window,所以name属性会被添加到window对象上,而不是person对象上
person();
console.log(window.name); // wangwu