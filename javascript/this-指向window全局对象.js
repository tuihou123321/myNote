function Person(name) {
    this.name=name;
}

Person('Tom'); // 直接调用，this指向window
console.log(name); // Tom, window.name被赋值为Tom