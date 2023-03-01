/*
* Proxy特性：
* 1. 代理对象的属性必须是可配置的，否则无法代理
* 2. 代理对象的属性必须是可枚举的，否则无法代理
* 3. 代理对象的属性必须是可写的，否则无法代理
* */

/*
* Object对象通过的操作方法包括：
* 1. 读取属性， obj.a
* 2. 设置属性 obj.a = 1
* 3. 删除属性, delete obj.a
* 4. 判断属性是否存在, 'a' in obj
* 5. 遍历属性, for...in
* ...
* */
const obj = {
    a:1
}

const objProxy = new Proxy(obj,{
    // 使用拦截器可以做的一些事情：打印日志，数据校验，数据格式转换，设置禁止访问私有属性
    get(target,prop){
        // 每次读取属性，记录日志
        console.log('get',prop); // prop 是当前读取的属性名
        return target[prop];
    },
    set(target,prop,value){
        // 每次设置属性，记录日志
        console.log('set',prop,value);
        target[prop] = value;
    },
    deleteProperty(target,prop){
        console.log('delete',prop);
        delete target[prop];
    },
    has(target,prop){
        console.log('has',prop);
        return prop in target;
    },
    ownKeys(target){
        console.log('ownKeys');
        return Object.keys(target);
    }
})

// 读取会触发get方法
console.log(objProxy.a);

// 写入会触发get方法
objProxy.b=2;

