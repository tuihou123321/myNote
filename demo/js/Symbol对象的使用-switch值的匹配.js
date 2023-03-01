const shapeType ={
   triangle:Symbol(), // 三角形 ，由于symbol生成的值是唯一的。可以防止属性名的冲突
   rectangle:Symbol(), // 长方形
}

// 计算面积的方法，先判断形状。然后再计算面积
function getArea(shape, options) {
    // 最后的面积
    let area = 0;
    switch (shape) {
        case shapeType.triangle:
            area = 0.5 * options.width * options.height;
            break;
        case shapeType.rectangle:
            area = options.width * options.height;
        break;
    }
    return area;
}

console.log(getArea(shapeType.triangle,{width:10,height:2}))