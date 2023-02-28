const obj ={
    hasOwnProperty: function () {
        return false;
    },
    b:2,
}

// obj中的hasOwnProperty属性被复写了，所以返回false。
console.log(obj.hasOwnProperty('b'));
