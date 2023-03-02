/**
 * Created by mqd on ${DATE}.
 */
import React from 'react';
import {Link} from "react-router-dom"

//import "./TestLists.css"
import {delHtmlTag, loadImage} from "../../utils/common"


export default function TestLists(lists,isHasPrice=true){
        return (
            <div className="bg-white lists2 bdb1-warp pr15 pl15">
                {
                    lists.map((item,index)=>{
                      if(!item.cover){
                        item.cover=loadImage("cover");
                      }
                        return (
                          <div  key={index}>
                            <Link to={"/ceshi/start/"+item.id} >
                              <div className="df pb20 pt20">
                                <div className={"mr15"} style={{width:"1.15rem",height:"1.15rem"}}>
                                   <img src={item.cover} alt="" style={{width:"1.15rem",height:"1.15rem"}} className={"bdrs5"}/>
                                </div>
                                <div  className="itemRight rel db fx1">
                                  <div className="b fz16 line2 mb5" style={{WebkitBoxOrient: "vertical"}}>
                                    {item.name}
                                  </div>
                                  <div className={"line2 fz13"} style={{WebkitBoxOrient: "vertical"}}>
                                    {
                                      delHtmlTag(item.desc)
                                    }
                                  </div>
                                  {
                                    isHasPrice &&  <div className={"abs b0"} style={{width:"2.3rem"}}>
                                      <div className="dib pr15">
                                        {
                                          item.price!==0 ? <div className={"dib orange"}>¥<span className={"fz18"}>{item.price}</span></div>
                                            :<span className={"green"}> 免费 </span>
                                        }
                                      </div>
                                      <span className="c9">
                                      {item.testNum}人已测
                                    </span>
                                    </div>
                                  }
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

