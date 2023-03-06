function Animal(name,age) {
  this.name = name;
  this.age= age;
  this.sayName= function() {
    console.log('My name is ' + this.name);
  }
}

Animal.prototype.sayAge = function() {
    console.log('My age is ' + this.age);
}


function Cat(name,age,color) {
  // 改变Animal父类对象中this的指向，使得Animal中的this指向Cat的实例对象。实现继承Animal的实例属性
  Animal.call(this,name,age); // 继承Animal的实例属性
  // 添加猫自己的实例属性
  this.color = color;
}

// 实例化Animal的实例对象，然后把这个实例对象的原型赋值给Cat的原型.
Cat.prototype = new Animal();

console.log(Cat); // [Function: Cat]
console.log(Cat.prototype.constructor); // [Function: Animal], 如果不修复构造函数指向，Cat的实例对象的构造函数指向的是Animal

// 修复构造函数指向,constructor的作用是指向当前对象的构造函数
Cat.prototype.constructor = Cat;

console.log(Cat.prototype.constructor); // [Function: Cat]


// 为Cat添加一个方法
Cat.prototype.sayColor = function() {
    console.log('My color is ' + this.color);
}


const cat = new Cat('Tom',2,'white');

cat.sayName(); // My name is Tom
cat.sayAge(); // My age is 2
cat.sayColor(); // My color is white

// 判断Animal原型上是不是有sayColor方法
console.log(Animal.prototype.hasOwnProperty('sayColor')); // false; 说明没有影响到Animal的原型方法