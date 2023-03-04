let name='zhangsan';
// 在node环境中，不存在window对象，所以this指向的是global
typeof window!=="undefined" && (window.name='lisi');

function person() {
   return this.name;
}
const person2 = function(){
    return this.name
};

console.log(person()); // undefined, 在node环境中，不存在window对象，所以this指向的是global,gloabl.name为undefined
console.log(person2()); // undefined
