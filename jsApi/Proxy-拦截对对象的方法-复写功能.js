/*
* Proxy特性：
* 1. 代理对象的属性必须是可配置的，否则无法代理
* 2. 代理对象的属性必须是可枚举的，否则无法代理
* 3. 代理对象的属性必须是可写的，否则无法代理
* */

const obj = {
    a:1
}

const objProxy = new Proxy(obj,{
    get(target,prop){
        // 每次读取属性，记录日志
        console.log('get',prop); // prop 是当前读取的属性名
        return target[prop];
    },
    set(target,prop,value){
        // 每次设置属性，记录日志
        console.log('set',prop,value);
        target[prop] = value;
    }
})

// 读取会触发get方法
console.log(objProxy.a);

// 写入会触发get方法
objProxy.b=2;

