import React from "react"
import {courseTypeArr} from "../../../enums/enums"

export let priceFun=(price)=>{
  price=price.toString()
  if(price.indexOf(".")<0){
    return  <span><em className={"fz30"}>{price}</em>.00</span>
  }
  else{
    let a=price.split(".")[0];
    let b=price.split(".")[1];
    return  <span><em className={"fz30"}>{a}</em>.{b}</span>
  }
}

export let priceFun2=(price)=>{
  price=price.toString()
  if(price.indexOf(".")<0){
    return  <span>{price}.00</span>
  }
  else{
    let a=price.split(".")[0];
    let b=price.split(".")[1];
    return  <span>{a}.{b}</span>
  }
}

export let isCourseName=(typeId)=>{
  let a="";
  courseTypeArr.forEach(item=>{
    if(item.id===typeId){
      a=item.name;
    }
  })
  return a;
}
