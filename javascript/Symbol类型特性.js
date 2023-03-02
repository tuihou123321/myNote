/*
* symbol类型特性：
* 1. symbol是一种新的原始数据类型
* * 2. symbol()函数返回的值是唯一的.即使传入相同的参数。参数是为了在控制台打印区份。也会返回不同的值,参数是可选的
* 5.symbol()函数不能使用new命令，否则会报错
* 7. symbol 作为属性名时，不能通过Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。
*
* */

//
// console.log(typeof Symbol('a'));  // 输出值为：symbol .symbol是一种新的原始数据类型。symbol('b')函数的参数只是对当前Symbol值的描述
//
// console.log(Symbol('b')===Symbol('b'));  // false,因为Symbol()函数返回的是一个Symbol类型的值，不是字符串，所以不会匹配到任何一个case,即使传入相同的参数，也会返回不同的值


const key1= Symbol('a');
const key2= Symbol('b');
const obj={
    a:1,
    [key1]:11,  // 不能通过JSON.Stringify()方法获取对象的属性名。 Object.keys()方法获取对象的属性名.
    [key2]:22  // 不能通过JSON.Stringify()方法获取对象的属性名。 Object.keys()方法获取对象的属性名.
}
// console.log(obj)
// console.log(Object.keys(obj))  // 通过Object.keys()方法获取对象的属性名，返回的是一个数组，数组中的元素是字符串类型的属性名
// console.log(JSON.stringify(obj))  // 通过JSON.stringify()方法获取对象的属性名，返回的是一个字符串，字符串中的属性名是字符串类型的属性名

// Symbol作为属性名时，不能通过Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。
Object.getOwnPropertySymbols(obj).forEach((item)=>{
    console.log(item);
})

