/**
 * Created by mqd on ${DATE}.
 */
import React from 'react';
import "./UserTestLists.css"


//代表是否是首页
export default function TestLists(lists,history){
        let goReport=(reportId,homeId)=>{
          localStorage.setItem("homeId",homeId);
          history.push(`/ceshi/report/${reportId}`);
        }
        return (
            <div className="bg-white lists2 bdb1-warp pr15 pl15">
                {
                    lists.map((item,index)=>{
                        return (
                          <div  key={index}>
                              <div className="df pb20 pt20" onClick={()=>goReport(item.id,item.testItemsId)}>
                                <div className={"mr15"}>
                                  <img src={item.cover} alt="" style={{width:"0.9rem",height:"0.9rem"}} className={"bdrs5"}/>
                                </div>
                                <div  className="itemRight mt5 rel db">
                                  <div className="b fz16 line2" style={{WebkitBoxOrient: "vertical"}}>
                                    {item.name}
                                  </div>
                                  <div className={"abs b0"} style={{width:"2.3rem"}}>
                                    <div className="c9"> 测试时间：{item.createTime}</div>
                                  </div>
                                </div>
                               </div>
                          </div>
                        )
                    })
                }
            </div>
        );
}

