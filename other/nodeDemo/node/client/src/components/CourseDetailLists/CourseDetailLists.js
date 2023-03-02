/**
 * Created by mqd on ${DATE}.
 */
import React, { Component } from 'react';

export default class CourseDetailLists extends Component {
   goToUrl=(id,index)=>{
     let {history,isBuy,showPopupFun}=this.props;
      if(isBuy){
        history.push(`/course/play/${id}/${index}`);
      }
      else{
        showPopupFun();
      }
  }
  render(){
    let {lists}=this.props;
        return (
            <div className="bg-white lists2  bdb1-warp">
                {
                    lists.map((item,index)=>{
                        return (
                            <div  key={index} onClick={()=>{this.goToUrl(item.id,index)}}>
                                <div className="df pb20 pt20">
                                  <div className={"mr15 h80"} style={{width:"1.47rem"}}>
                                    <div style={{width:"1.47rem",height:"0.8rem",backgroundImage: `url(${item.pic})`}} className={"bjImageCenter"}/>
                                  </div>
                                  <div  className="itemRight mt5 rel db">
                                    <div className="b fz16 line2" style={{WebkitBoxOrient: "vertical"}}>
                                      {item.title}
                                    </div>
                                    <div className={"abs b0"} style={{width:"1.8rem"}}>
                                      <span className={"fz12 c6"}>人气 {item.readNums}</span>
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
}
