// 【构造函数】创始一个构造函数
function Person() {
    this.sayName2=function(){
    }
}
// 【在构造函数的原型上添加共用的方法】为构造函数添加方法，这样所有实例化的对象都可以调用这个方法。相比之间在构造函数中添加方法，这样做可以节省内存空间。因为最后的实例化对象都是共用的这个方法。
Person.prototype.sayName = function () {
}
// 实例化一个对象
const p1 = new Person();
const p2 = new Person();

console.log(p1.sayName===p2.sayName); // true, 说明p1和p2的sayName方法是共用的,节省了内存空间
console.log(p1.sayName2===p2.sayName2); // false, 说明p1和p2的sayName2方法是不共用的