/**
 * Created by mqd on ${DATE}.
 */
import React from 'react';
import {Link} from "react-router-dom"
import pic from "../../static/images/100.png"

function applyFeeFun(applyFee){
  if(!applyFee){
    applyFee=0;
  }
  applyFee=applyFee.toString();
  if(applyFee.indexOf(".")>0){
    return <div className="orange dib">
      ¥<span className={"fz18"}>{applyFee.split(".")[0]}</span>
      <span>.{applyFee.split(".")[1]}</span>
    </div>
  }
  else{
    return  <div className="orange dib">
      ¥<span className={"fz18"}>{applyFee}</span>
      <span>.00</span>
    </div>
  }
}

export default function CourseLists(lists){
        return (
            <div className="bg-white lists2 bdb1-warp pr15 pl15">
                {
                    lists.map((item,index)=>{
                        if(!item.pic){
                          item.pic=pic;
                        }
                        return (
                          <Link to={`/course/detail/${item.id}`} key={index}>
                            <div>
                              <div className="df pb20 pt20">
                                <div className={"mr15 h80"} style={{width:"1.47rem"}}>
                                  <div style={{width:"1.47rem",height:"0.8rem",backgroundImage: `url(${item.pic})`}} className={"bjImageCenter"}/>
                                </div>
                                <div  className="itemRight mt5 rel db">
                                  <div className="b fz16 line2" style={{WebkitBoxOrient: "vertical"}}>
                                    {item.title}
                                  </div>
                                  <div className={"abs b0"} style={{width:"1.8rem"}}>
                                    <div className={"pr15 dib"}>
                                      {
                                        applyFeeFun(item.applyFee)!==0 ? applyFeeFun(item.applyFee)
                                          :<span className={"green"}>免费</span>
                                      }
                                    </div>
                                    <span className={"fz12 c6"}>{item.readNums} 人已报名</span>
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
