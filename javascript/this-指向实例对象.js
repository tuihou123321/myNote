// 全局变量
let name= 'Jack';
function Person() {
    // 复写全局变量
    name= 'Lucy';
    // 实例属性
  this.name = 'Tom'
  this.sayName = function() {
    return this.name;
  }
}

// 实例化
const person = new Person();
// 实例方法
console.log(person.sayName()); // Tom, this 指向实例对象, person