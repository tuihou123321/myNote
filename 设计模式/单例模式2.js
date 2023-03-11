// 自执行函数，返回一个对象，这个对象有一个方法，这个方法返回一个对象，这个对象是唯一的。
const Singleton = (function() {
    // 定义一个变量，用来保存实例
    let instance;

    // 创建函数
    function createInstance() {
        const object = new Object("I am the instance");
        return object;
    }

    return {
        getInstance: function() {
            // 通过判断instance是否存在，来决定是否创建实例
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

// 获取单例, 并验证是否相等。每次调用这个方法，返回的值都是一样的。
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

// 验证两个实例是否相等
console.log(instance1 === instance2); // true
