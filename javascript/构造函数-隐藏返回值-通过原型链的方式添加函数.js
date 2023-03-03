function Person(name, age) {
    this.name = name;
    this.age = age;
    // 注意这是虽然没有写返回值，但是通过new调用构造函数时，会自动返回一个对象。这个对象就是实例对象，包含了构造函数中的所有属性和方法。
}
// 可以通过原型链的方式添加函数
Person.prototype.getFullName = function() {
    // this指向实例对象, 也就是p1
    return `${this.name} ${this.age}`;
}

const p1= new Person('张三', 18);

console.log(p1);  // Person { name: '张三', age: 18 }
console.log(p1.name);  // 张三
console.log(p1.getFullName()); // 张三 18
