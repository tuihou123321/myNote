function sum(value1, value2) {
    return value1 + value2;
}


const sumProxy = new Proxy(sum,{
  apply(target, thisArg, argArray) {
      // target: 被代理的函数, thisArg: 函数的this, argArray: 函数的参数
    console.log('apply',target, thisArg, argArray);
    // 把函数的返回值*2
    return target.apply(thisArg, argArray)*2;
  }
})

// 函数的三种调有方式，都会触发apply方法，但是thisArg不同，分别是null,undefined,window，这个需要注意。
// call, apply, bind方法的第一个参数都是thisArg,如果不传，那么默认是undefined,如果传null,那么thisArg就是null,如果传window,那么thisArg就是window,如果传一个对象，那么thisArg就是这个对象.
console.log(sumProxy(1,2));
console.log(sumProxy.call(null,1,2));
console.log(sumProxy.apply(null,[1,2]));

