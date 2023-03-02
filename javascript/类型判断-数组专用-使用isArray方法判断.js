// 判断变量不是数组
function isArray(value) {
    return Array.isArray(value);
}

console.log(isArray([1]))
console.log(isArray({}))