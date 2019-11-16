import React from 'react';
import {Link} from "react-router-dom"

export default function Item({item,style}) {
  //保留2位小数
  if(item.applyFee || item.applyFee===0){
    item.applyFee2=item.applyFee.toFixed(2).toString().split(".");
  }else{
    item.applyFee2=[0,"00"];
  }
  return (
    <Link className={"p10 boxShadow db"} style={{width:"1.34rem"}} to={`/course/detail/${item.id}`}>
      <img src={item.pic} alt="" style={{width:"1.34rem",height:"0.72rem"}} className={"dbrs5 mb15 bdrs5"}/>
      <div className={"mb10 fz14 line2 h40"}>{item.title}</div>
      <div className={"df aic jcb fz11"}>
        <span className={"grey"}>
          {item.readNums || 0}人学
        </span>
        <div className={"orange7"}>
          ¥<span className={"fz16 b"}>{item.applyFee2[0]}</span>
          <span>
               .{item.applyFee2[1]}
          </span>
        </div>
      </div>
    </Link>
  );
}
