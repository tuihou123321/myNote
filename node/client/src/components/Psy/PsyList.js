import React from 'react';
import defaultImg from "../../static/images/default.png"
import {saveState} from "../../static/js/common";


export default function PsyList(props,content){
    let {lists}=props;
    function goTo(id){
        saveState({...props});
        window.h.push(`/Psy/Detail/${id}`)
    }
    if(!lists || lists.length===0){return false;}
    return (
      <div>
          {
              lists.map((item,index)=>{
                  if(!item.coverUrl){item.coverUrl=defaultImg;}
                  return <div className={"df pt15 pb15 jcb bdb1"} onClick={()=>goTo(item.id)} key={index}>
                      <div className={"fx1 pr15"}>
                          <h3 className={"fz15 line2 grey2"} style={{WebkitBoxOrient: "vertical"}}>
                              {item.title}
                          </h3>
                          <div className={"grey fz12 line2"} style={{WebkitBoxOrient: "vertical"}}>
                              {item.content}
                          </div>
                      </div>
                      <div style={{width:"1.42rem"}}>
                        <div style={{width:"1.42rem",height:"0.8rem",backgroundImage: `url(${item.coverUrl})`}} className={"bdrs5 bjImageCenter"}/>
                      </div>
                  </div>
              })
          }
      </div>
    );
}
