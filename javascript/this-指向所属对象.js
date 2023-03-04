const obj={
    name:'zhangsan',
    getName:function(){
        return this.name;
    }
}

// console.log(obj.getName()); // zhangsan, this指向obj对象（因为getName是obj调用的，所以getName中的this指向obj对象）

const obj2=function(){
    return this;
}

console.log(obj2())