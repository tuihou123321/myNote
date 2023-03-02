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
    // 拦截了get方法，但是不返回，默认为undefined
    get(target,prop){
        // 每次读取属性，记录日志
        console.log('get',prop); // prop 是当前读取的属性名
    },
    // 拦截了set方法，但是不修改值，原始值不会改变
    set(target,prop,value){
        // 每次设置属性，记录日志
        console.log('set',prop,value);
    }
})
