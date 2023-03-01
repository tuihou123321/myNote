// symbol类型的值可以作为对象的属性名,但是不能用点运算符来访问属性,只能用中括号运算符来访问属性,因为点运算符后面总是字符串,而属性名是Symbol类型的值.
const key=Symbol();
const key2=Symbol();
const obj={
    [key]:'value',
    [key2]:'value2',
}

console.log(obj)
console.log(obj[key]);  // value
console.log(obj[key2]);  // value