function Person() {
    this.name="张三";
    this.sayName=function(){
        return this.name;
    }
}

const person=new Person();
console.log(person.sayName()); // 张三

const sayName=person.sayName;
// 使用bind方法，将sayName中的this指向person对象
console.log(sayName.bind(person)()); // 张三