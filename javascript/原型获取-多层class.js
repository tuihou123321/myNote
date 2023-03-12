class Animal {
    // constructor是构造函数，用来接收参数
    constructor(name) {
        // 实例的属性
        this.name = name;
    }
}

class Cat extends Animal {
    constructor(name,age) {
        super(name);
        this.age= age;
    }
}

const cat = new Cat('Tom',2);


console.log(cat.__proto__.constructor.name); // Cat
console.log(cat.__proto__.constructor.__proto__.constructor.name); // 打印结果为：Function。为什么不是Animal？因为Animal是Cat的父类，Cat继承了Animal的属性和方法，但是Animal不是Cat的原型，Cat的原型是Object。

// 判断对象的父类可以使用instanceof，如下：
console.log(cat instanceof Cat); // true
console.log(cat instanceof Animal); // true


