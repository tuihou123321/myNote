// 使用构造函数创建对象，实现链式调用，互不影响
function CreateObj() {
    this.name= 'zhangsan';
    this.getName=function(){
        return this.name;
    };
    this.setName = function(name){
        this.name=name
        // 链式调用的关键，返回this，这样就可以继续调用setName方法
        return this
    }
}

const obj = new CreateObj();
console.log(obj.setName('lisi').getName());


const obj2 = new CreateObj();
console.log(obj2.getName());