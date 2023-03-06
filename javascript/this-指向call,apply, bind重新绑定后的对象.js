function Person() {
    this.name="张三";
    this.sayName=function(){
        return this.name;
    }
}

const person=new Person();
console.log(person.sayName()); // 张三, 实例对象调用方法，this指向实例对象

const sayName=person.sayName; // 将方法赋值给变量

sayName(); // undefined,this指向了window对象;如果需要把this指向person对象，可以使用bind方法.也可以使用call,apply方法

// 使用call方法，将sayName中的this指向person对象
console.log(sayName.call(person)); // 张三
console.log(sayName.apply(person)); // 张三

// 使用bind方法，将sayName中的this指向person对象
console.log(sayName.bind(person)()); // 张三