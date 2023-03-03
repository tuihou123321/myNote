let obj ={
    name:'abc'
}

function fn(params) {
    // 修改params的属性, 会影响到obj, 因为obj和params指向同一个对象
    params.name = 'def'; // 修改params的属性
    // 修改params的引用, 不会影响到obj, 因为obj和params指向不同的对象
    params = {}
}

fn(obj);

console.log(obj); // { name: 'def' }, 说明obj的引用没有被修改, 但是obj的属性被修改了