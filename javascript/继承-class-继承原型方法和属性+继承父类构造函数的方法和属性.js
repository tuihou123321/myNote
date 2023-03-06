class Animal {
    // constructor是构造函数，用来接收参数
  constructor(name,age) {
      // 实例的属性
    this.name = name;
    this.age = age;
  }
  // 原型属性
  type= '动物'
  // 原型方法
  sayName() {
    console.log('My name is ' + this.name);
  }
  sayAge() {
      console.log('My age is ' + this.age);
  }
}

class Cat extends Animal {
    // constructor是构造函数，用来接收参数.如果子类没有定义constructor方法，这个方法会被默认添加。
    // 子类的constructor方法默认会调用super方法，而且super方法必须在子类的constructor方法中调用.不调用的话，会报错
  constructor(name,age) {
      // super的作用是调用父类的构造函数，传入参数，如果不传入参数，相当于调用父类的默认构造函数
    super(name,age);
  }
  // 子类特有的属性
  // 抓老鼠
    catchMouse() {
        console.log('抓老鼠')
    }
}

// new 方法传入的参数都会被当作 Animal 构造函数的参数传入
const cat = new Cat('Tom',2);
cat.sayName(); // My name is Tom,继承自父类的方法
cat.sayAge(); // My age is 2, 继承自父类的方法
cat.catchMouse(); // 抓老鼠, 子类的方法
console.log(cat.name); // Tom, 实例的属性
console.log(cat.type); // 动物， 原型的属性