// Promise是一个构造函数，接收一个函数作为参数，该函数的两个参数分别是resolve和reject；
// Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数；
// Promise实例生成以后，可以用catch方法指定rejected状态的回调函数；
// Promise实例生成以后，可以用finally方法指定不管Promise对象最后状态如何都会执行的操作；

const promise = new Promise(function(resolve, reject) {
  // 第一步：
    console.log('进入Promise方法体');
  setTimeout(function() {
    resolve('success');
  },1000)
}).then(function(value) {
  // 第三步：最后执行
    console.log(value, 'resolved');
})

// 第二步：先执行
console.log('Promise执行完毕');