/**
 * Created by mqd on ${DATE}.
 */
import React from 'react';
import {Link} from "react-router-dom"

import "../TestListsIndex/TestLists.css"
import {delHtmlTag, loadImage} from "../../utils/common"


export default function PsyListsIndex(lists){
        return (
            <div className="bg-white lists2 bdb1-warp pr15 pl15">
                {
                    lists.map((item,index)=>{
                        return (
                          <div  key={index}>
                            <Link to={"/psy/detail/"+item.id} >
                              <div className="df pb20 pt20">
                                <div className={"mr15"}>
                                  <div style={{width:"1.15rem",height:"1.15rem",backgroundImage: `url(${item.cover})`}} className={"bdrs5 bjImageCenter"}/>
                                </div>
                                <div  className="itemRight rel db fx1">
                                  <div className="b fz16 line2 mb5" style={{WebkitBoxOrient: "vertical"}}>
                                    {item.name}
                                  </div>
                                  <div className={"line2 fz13"} style={{WebkitBoxOrient: "vertical"}}>
                                    {
                                      delHtmlTag(item.content)
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

