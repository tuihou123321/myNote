/**
 * Created by mqd on ${DATE}.
 */
import React from 'react';
import {Link} from "react-router-dom"
import "./UserCourseLists.css"


export default function UserCourseLists(lists){
  let applyFeeFun=(applyFee)=>{
    if(applyFee===0 || !applyFee){
      return <div className={"green"}>免费</div>
    }
    applyFee=applyFee.toString();
    if(applyFee.indexOf(".")>0){
      return <div className="orange dib">
        ¥<span className={"fz18"}>{applyFee.split(".")[0]}</span>
        <span>.{applyFee.split(".")[1]}</span>
      </div>
    }
    else{
      return "¥"+applyFee+".00"
    }
  }
        return (
            <div className="bg-white lists2 bdb1-warp pr15 pl15">
                {
                    lists.map((item,index)=>{
                        return (
                          <Link to={`/course/detail/${item.courseId}`} className='w100p'>
                            <div  key={index}>
                              <div className="df pb20 pt20">
                                <div className={"mr15 h80"} style={{width:"1.47rem"}}>
                                  <div style={{width:"1.47rem",height:"0.8rem",backgroundImage:`url(${item.pic})`}}  className={"bjImageCenter"}/>
                                </div>
                                <div  className="itemRight mt5 rel db">
                                  <div className="b fz16 line2" style={{WebkitBoxOrient: "vertical"}}>
                                    {item.title}
                                  </div>
                                  <div className={"abs b0"} style={{width:"1.8rem"}}>
                                    <div className={"dib pr15"}>
                                    {applyFeeFun(item.money)}
                                    </div>
                                    <span className={"fz12 c6"}>{item.createTime && item.createTime.split(" ")[0]} 购买</span>
                                  </div>
                                </div>
                               </div>
                            </div>
                          </Link>
                        )
                    })
                }
            </div>
        );
}
