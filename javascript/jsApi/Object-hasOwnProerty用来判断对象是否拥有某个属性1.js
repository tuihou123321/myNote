const obj ={
    a:1,
    b:2,
    c:undefined
}

console.log(obj.c);  // 如果没有属性c，会返回undefined。如果有属性c，但是值为undefined，也会返回undefined


// 通过object.hasOwnProperty()方法来判断对象是否有某个属性
console.log(obj.hasOwnProperty('c')); // 即使属性是null ,undefined,也会返回true.因为null和undefined是对象的属性值
console.log(obj.hasOwnProperty('hasOwnProperty')); // hsoOwnProperty是Object的原型方法,所以返回false.