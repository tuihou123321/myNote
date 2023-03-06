function fn() {
    console.log(arguments); // arguments是一个类数组对象，不能直接使用数组的方法。
    console.log(Array.prototype.slice.call(arguments)); // [ 'a', 'b', 'c' ],将arguments转换为数组，然后再使用数组的方法。
    console.log(Array.prototype.slice.apply(arguments));
    console.log(Array.prototype.slice.bind(arguments)());
    // call的使用方法，第一个参数是this的指向，后面的参数是传递给函数的参数，这里的this指向的是arguments，所以arguments就可以使用数组的方法了。
    // call的第一个参数是this的指向，如果是null或者undefined，那么this指向的是window。
}

fn('a','b','c');
