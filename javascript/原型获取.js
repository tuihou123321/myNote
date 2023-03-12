function Animal() {
    this.name = 'animal';
}
const cat = new Animal();

// 如何判断cat的原型是哪个构造函数？
console.log(cat.__proto__.constructor); // [Function: Animal]
console.log(cat.__proto__.constructor.name); // Animal, 通过constructor.name获取构造函数的名字