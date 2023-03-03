const obj ={
    name:'zhangsan',
    age:20,
    setName:function(name){
        this.name=name
        // 链式调用的关键，返回this，这样就可以继续调用setName方法
        return this
    },
    setAge:function(name){
        this.name=name
        // 链式调用的关键，返回this，这样就可以继续调用setName方法
        return this
    },
    introduce:function(){
        console.log('my name is '+this.name,',my age is '+this.age)
    }
}
obj.introduce();
obj.setName('lisi').setAge(22).introduce();