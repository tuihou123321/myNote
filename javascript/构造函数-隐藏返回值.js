function Person(name, age) {
    this.name = name;
    this.age = age;
    this.getFullName = function () {
        return this.name + ' ' + this.age;
    }
    // 注意这是虽然没有写返回值，但是通过new调用构造函数时，会自动返回一个对象。这个对象就是实例对象，包含了构造函数中的所有属性和方法。
}
const p1= new Person('张三', 18);

console.log(p1.name);  // 张三
console.log(p1.getFullName()); // 张三 18
