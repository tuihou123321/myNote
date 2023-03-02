const obj ={
    a:1,
    b:2
};

const obj2={
    b:2,
    a:1,
}

// 判断obj和obj2是否相等
// 1. 判断obj和obj2的key是否相等
// 2. 判断obj和obj2的value是否相等
// 3. 判断obj和obj2的key和value是否相等
function isObjectEqual(obj1, obj2) {
    // 1. 判断obj和obj2的key是否相等
    // 1.1 判断obj1和obj2的key的长度是否相等
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
    }
    // 1.2 判断obj1和obj2的key是否相等
    for (let key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            if (!obj2.hasOwnProperty(key)) {
                return false;
            }
        }
    }
    // 2. 判断obj和obj2的value是否相等
    for (let key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }
    }
    // 3. 判断obj和obj2的key和value是否相等
    for (let key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            if (obj1[key] !== obj2[key] || key !== key) {
                return false;
            }
        }
    }
    return true;
}

console.log(isObjectEqual(obj, obj2));