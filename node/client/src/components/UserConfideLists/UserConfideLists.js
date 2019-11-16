/**
 * Created by mqd on ${DATE}.
 */
import React from 'react';
import {Link} from "react-router-dom"
import "./UserConfideLists.css"
import {formatSeconds} from "../../utils/common"
import head from "../../static/images/100.png"  //默认图片

export default function UserConfideLists(lists){
  return (
    <div className="bg-white lists2 bdb1-warp pr15 pl15">
      {
        lists.map((item,index)=>{
          if(!item.head){
            item.head=head;
          }
          return (
            <div  key={index}>
              <Link to={"/confide/detail/"+item.listenerId} >
                <div className="df pb20 pt20">
                  <div className={"mr15"}>
                    <img src={item.head} alt="" style={{width:"0.9rem",height:"0.9rem"}} className={"bdrs5"}/>
                  </div>
                  <div  className="itemRight rel db">
                    <div className="b fz16 line2 mb5" style={{WebkitBoxOrient: "vertical"}}>
                      {item.name}
                    </div>
                    <div className={"line2 fz13"} style={{WebkitBoxOrient: "vertical"}}>

                    </div>
                    <div className={"abs b0"} style={{width:"2.3rem"}}>
                      <p> 时长:{formatSeconds(item.callLong,true)}</p>
                     时间：{item.callStartTime}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )
        })
      }
    </div>
  );
}

