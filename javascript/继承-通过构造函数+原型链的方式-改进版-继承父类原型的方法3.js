function Animal(name,age) {
  this.name = name;
  this.age= age;
  this.sayName= function() {
    console.log('My name is ' + this.name);
  }
}

Animal.prototype.sayAge = function(){
    console.log('My age is ' + this.age);
}


function Cat(name,age,color) {
  // 改变Animal父类对象中this的指向，使得Animal中的this指向Cat的实例对象。实现继承Animal的实例属性
  Animal.call(this,name,age); // 继承Animal的实例属性
  // 添加猫自己的实例属性
  this.color = color;
}
// 深拷贝一份Animal的原型方法
function deepCopy(obj) {
    let newObj = {};
    for(let key in obj) {
        if(typeof obj[key] === 'object') {
            newObj[key] = deepCopy(obj[key]);
        } else {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
// 原型链的方法继承，使用prototype单独再继承一次
Cat.prototype = deepCopy(Animal.prototype);  // 先把Animal的原型方法复制一份，然后再赋值给Cat的原型

// 给Cat的原型添加一个方法,Animal的原型方法也会被继承
Cat.prototype.sayColor = function() {
    console.log('My color is ' + this.color);
}


const cat = new Cat('Tom',2,'white');

cat.sayName(); // My name is Tom
cat.sayAge(); // My age is 2
cat.sayColor(); // My color is white


// 判断Animal原型上是不是有sayColor方法
console.log(Animal.prototype.hasOwnProperty('sayColor')); // false;