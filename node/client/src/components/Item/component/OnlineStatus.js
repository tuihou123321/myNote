import React from "react"
import {loadImage} from "../../../utils/common";

export default ({item})=>{
  let {scheduleIsOneline,handIsOnline,status}=item;
  //离线
  if(scheduleIsOneline!==1 || handIsOnline!==1){
    // return <span className={"w45 h45 fz10 bdrs50p lh45 dib white tac"} style={{backgroundColor:"#999"}}>已离线</span>
    return <span className={"w45 h45 fz10 bdrs50p lh45 dib white tac"} style={{backgroundColor:"#ff8c00"}}>通话中</span>
  }else{
    //在线空闲
    if(status===1){
      return (
        <span className={"w45 h45 fz10 bdrs50p lh45 dib white tac"} style={{backgroundColor:"#3d9eff"}}>
              <img src={loadImage("phone.svg")} alt="" className={"w25 h25"} style={{marginTop:"0.09rem"}}/>
            </span>
      )
    }
    //在线忙碌
    else{
      return <span className={"w45 h45 fz10 bdrs50p lh45 dib white tac"} style={{backgroundColor:"#ff8c00"}}>通话中</span>
    }
  }
}
