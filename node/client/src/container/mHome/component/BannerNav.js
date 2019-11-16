import React, {Component} from 'react';
import {loadImage} from "../../../utils/common";
import { Link } from "react-router-dom"

let navLists1=[
  {
    title:"倾诉热线",
    url:"/confide",
    imageName:"ico_qsrx@3x.png"
  },{
    title:"心理测试",
    url:"/ceshi",
    imageName:"ico_xlcs@3x.png"
  },{
    title:"心理资讯",
    url:"/psy",
    imageName:"ico_xlzz@3x.png"
  },{
    title:"心理课程",
    url:"/course",
    imageName:"ico_xlkc@3x.png"
  }
]



let navLists2=[
  {
    title:"倾诉热线",
    url:"/confide",
    imageName:"ico_qsrx@3x.png"
  },{
    title:"心理测试",
   url:"/ceshi",
    imageName:"ico_xlcs@3x.png"
  },{
    title:"心理课程",
    url:"/course",
    imageName:"ico_xlkc@3x.png"
  },{
    title:"心理委员",
    url:"/psyMember",
    imageName:"ico_xlwy@3x.png"
  }
]

let navLists=window.location.href.indexOf("gaoxiaoban")>-1?navLists2:navLists1;


export default function BannerNav() {
  return (
      <div className={"w100p mt20 pb20"}>
        <div className={"mlr15 p15 bg-white boxShadow bdrs5"}>
          <div className={"df jcb tac pb10"}>
            {
              navLists.map((item,index)=>{
                return <Link to={item.url} className={"fx1"} key={index}>
                  <img src={loadImage(item.imageName)} alt={item.title} className={"w50 h50"}/>
                  <div className={"pt5  fz12"}>{item.title}</div>
                </Link>
              })
            }
          </div>
          <img src={loadImage("navListsSmall.png")} alt="" className={"w100p"}/>
        </div>
      </div>
  );
}
