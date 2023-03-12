function Person() {
    this.sayName = function(){
        console.log('sayName1');
    }
}
Person.prototype.sayName = function () {
    console.log('sayName2');
}
// 实例化一个对象
const p = new Person();

p.sayName();
// 原型链和构造函数方法的优先级为：构造函数方法>原型链方法，所以p.sayName()会打印sayName1