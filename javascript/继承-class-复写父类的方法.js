class Animal {
    // constructor是构造函数，用来接收参数
  constructor(name,age, weight) {
      // 实例的属性
    this.name = name;
    this.age= age;
  }
  sayName() {
    console.log('My name is ' + this.name);
  }
  sayAge() {
    console.log('My age is ' + this.age);
  }
  animalType = '动物'
}

class Cat extends Animal {
    // constructor是构造函数，用来接收参数.如果子类没有定义constructor方法，这个方法会被默认添加。
    // 子类的constructor方法默认会调用super方法，而且super方法必须在子类的constructor方法中调用.不调用的话，会报错
  constructor(name,age, weight) {
      // super的作用是调用父类的构造函数，传入参数，如果不传入参数，相当于调用父类的默认构造函数
    super(name, age);
    // 构造函数中复写父类构造函数的属性
    this.age= age+'岁';
  }
  // 子类原型上的方法会覆盖父类原型上的同名方法
    sayName() {
      // super.sayName();
      console.log('大家好，我的名字是' + this.name);
    }
    // 子类原型上的属性会覆盖父类原型上的同名属性
    animalType = '猫科动物'
}


const cat = new Cat('Tom',2);
cat.sayName();
console.log(cat.age); // 我今年2岁
console.log(cat.animalType); // 猫科动物
cat.sayAge(); // My age is 我今年2岁
