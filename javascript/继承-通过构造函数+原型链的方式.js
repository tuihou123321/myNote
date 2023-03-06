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

// const animal = new Animal('Tom',2);
// const animal2 = new Animal('Bili',3);
//
// console.log(animal.sayAge===animal2.sayAge); // true,因为sayAge是Animal的原型上的方法，所以animal和animal2的sayAge是同一个方法.通过原型链继承的方法，是共享的。可以通过instanceof来判断，但是不能通过===来判断，因为===是判断两个对象是否是同一个对象，而不是判断两个对象是否是同一个类型的对象
// console.log(animal.sayName===animal2.sayName); // false, 因为sayName是Animal的实例属性，所以animal和animal2的sayName是不同的方法
//
// animal.sayName(); // My name is Tom
// animal.sayAge(); // My age is 2


function Cat(name,age,color) {
  Animal.call(this,name,age); // 继承Animal的实例属性
  // 添加猫自己的实例属性
  this.color = color;
  // 添加猫自己的实例方法
  this.catchMouse= function() {
    console.log('I am catching mouse');
  }
}

const cat = new Cat('Tom',2,'white');
console.log(cat.name); // Tom
console.log(cat.color); // white
cat.sayName(); // My name is Tom
cat.sayAge(); // 特别注意: 通过调用Animal.call(this,name,age)方法，把Animal中this的指向改变了，所以这里的sayAge方法是Animal的sayAge方法，而不是Cat的sayAge方法。但是Animal的sayAge方法是通过原型链继承的，Cat无法调用Animal的sayAge方法，所以这里会报错。