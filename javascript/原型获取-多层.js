function Animal(name) {
    this.name = name;
}

function Cat(name,age) {
    Animal.call(this,name); // 继承Animal的实例属性
    // 添加猫自己的实例属性
    this.age = age;
}

const cat = new Cat('Tom',2);
// console.log(cat.name); // Tom
// console.log(cat.age); // 2

// 判断cat的原型是哪个构造函数？
console.log(cat.__proto__.constructor); // [Function: Animal]
console.log(cat.__proto__.constructor.name); // Cat, 通过constructor.name获取构造函数的名字
console.log(cat.__proto__.constructor.__proto__.constructor.name); // Function, 通过constructor.name获取构造函数的名字
