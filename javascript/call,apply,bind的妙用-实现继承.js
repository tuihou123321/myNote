// 父类
function Animal(age){
 // 属性
    this.age= age;
    // 方法
    this.sayName = function(){
        // this指向子类的实例对象,虽然父类没有name属性,但是子类有,所以可以访问到
        console.log(this.name);
    }
}

// 子类
function Cat(name,age){
    this.name = name;
    // 通过call方法,将父类的构造函数Animal的this指向子类的实例对象，这样就可以访问到子类的属性，也可以访问到父类的属性
    Animal.call(this,age);
}

// 子类的原型对象
const cat = new Cat('小花',2);
console.log(cat.name);// 小花
console.log(cat.age);// 2
cat.sayName();// 小花




// 子类
function Dog(name,age){
    this.name = name;
    // 通过call方法,将父类的构造函数Animal的this指向子类的实例对象，这样就可以访问到子类的属性，也可以访问到父类的属性
    Animal.apply(this,[age]);
}

// 子类的原型对象
const dog = new Dog('旺财',3);
console.log(dog.age);// 3
dog.sayName();// 旺财



// 子类
function Bird(name,age){
    this.name = name;
    // 通过call方法,将父类的构造函数Animal的this指向子类的实例对象，这样就可以访问到子类的属性，也可以访问到父类的属性
    Animal.bind(this,age)();
}

// 子类的原型对象
const bird = new Bird('小老虎',4);
console.log(bird.age);// 3
bird.sayName();// 旺财
