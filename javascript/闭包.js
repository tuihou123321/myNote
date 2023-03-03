function getValue(value) {
    // 下面的变量a，是一个局部变量，只能在getValue函数内部使用。它是属于闭包吗? 不是，因为它不是函数内部定义的。
    // 可以把它理解为一个普通的变量，只不过它的作用域是getValue函数内部。
    const a=2;
    return a*value;
}

console.log(getValue(3))