/**
 * Created by mqd on ${DATE}.
 */
import React from 'react';
import {Link} from "react-router-dom"
import cover from "../../static/images/100.png"

import "./TestLists.css"
import {delHtmlTag} from "../../utils/common"


export default function TestLists(lists){
        return (
            <div className="bg-white lists2 bdb1-warp pr15 pl15">
                {
                    lists.map((item,index)=>{
                      if(!item.cover){
                        item.cover=cover;
                      }
                        return (
                          <div  key={index}>
                            <Link to={"/ceshi/start/"+item.id} >
                              <div className="df pb20 pt20">
                                <div className={"mr15"}>
                                   <img src={item.cover} alt="" style={{width:"1.15rem",height:"1.15rem"}} className={"bdrs5"}/>
                                </div>
                                <div  className="itemRight rel db">
                                  <div className="b fz16 line2 mb5" style={{WebkitBoxOrient: "vertical"}}>
                                    {item.name}
                                  </div>
                                  <div className={"line2 fz13"} style={{WebkitBoxOrient: "vertical"}}>
                                    {
                                      delHtmlTag(item.desc)
                                    }
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

