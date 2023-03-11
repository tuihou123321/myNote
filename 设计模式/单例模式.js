/*
* 单例模式定义
* 保证一个类仅有一个实例，并提供一个访问它的全局访问点
* 适用场景
* 1.需要频繁实例化然后销毁的对象
* 2.创建对象时耗时过多或者耗资源过多，但又经常用到的对象
* 3.有状态的工具类对象
* 4.频繁访问数据库或文件的对象
* 5.需要定义大量静态常量或者静态方法的对象
* 6.系统只需要一个实例对象，如系统要求提供一个唯一的序列号生成器或者资源管理器，或者需要考虑资源消耗太大而只允许创建一个对象
* 7.想控制实例数目，节省系统资源的时候
* */

// 1.懒汉式
// 优点：第一次调用才初始化，避免内存浪费
// 缺点：必须加锁synchronized才能保证单例，但加锁会影响效率

// 创建一个单例对象，这个对象是一个构造函数，用来创建实例对象
var Singleton = function(name) {
    this.name = name
}
// 为单例对象添加一个方法，这个方法是共享的，所有实例对象都可以调用
Singleton.prototype.getName = function() {
    console.log(this.name)
}

// 获取实例对象,这个方法是共享的，所有实例对象都可以调用,getInstance方法是静态方法,只能通过类名调用.
// getInstance方法属于函数中的方法
// 通过自执行函数创建一个实例对象，并返回这个实例对象给到getInstance方法。
Singleton.getInstance = (function() {
    var instance = null
    return function(name) {
        // 没有实例化过，就实例化一个；如果实例化过，就直接返回这个实例
        if (!instance) {
            instance = new Singleton(name)
        }
        return instance
    }
})()

// 测试
var a = Singleton.getInstance('sven1')
var b = Singleton.getInstance('sven2')
console.log(a === b) // true

console.log(a.name); // sven1