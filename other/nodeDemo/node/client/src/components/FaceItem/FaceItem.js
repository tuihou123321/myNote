import React, { PureComponent, Fragment } from 'react';
import {changeWeekDay} from "../../static/js/common"
import {loadImage} from "../../utils/common";


export default class MessageTop extends PureComponent {
  state = {
  }
  componentDidMount(){
  }
  changeWeekDayB=(time)=>{
      if(!time){return}
      let a=new Date(time).getDay();
      return changeWeekDay(a);
  }
   render() {
      let {removeRecord,lists}=this.props;
    return (
      <div>
          {
             lists.map((item,index)=>(
                    <div className={"pb10 bdbGrey"} key={index}>
                      <div className={"df jcb pb20 pt20 pl10 pr10 bg-white acc"}>
                          <h4 className={"fz17 line1 fx1"}
                              style={{WebkitBoxOrient: "vertical"}}>
                              {item.consultTime} {this.changeWeekDayB(item.consultTime)} {item.amPm==="1"?"上午":"下午"}
                          </h4>
                          <span className={"w20"}/>
                          {
                            item.status==="2" ? <span className={"fz12 white bg-green pr5 pl5 bdrs3"} style={{lineHeight:"0.25rem"}}>已确认</span>
                              : <span className={"fz12 white bg-orange pr5 pl5 bdrs3"} style={{lineHeight:"0.25rem"}}>待确认</span>
                          }
                      </div>
                      <div className={"bg-grey-light p10 fz14"}>
                          <div className={"c6 "} style={{WebkitBoxOrient: "vertical"}}>
                              <div className={"mb10"}>
                                <div className={"aic dib"}>
                                    <div className={"dib"}>
                                     {item.consultName.substring(0,1)}
                                      {
                                        (()=>{
                                          if(item.gender==="2"){
                                              return <span>女士</span>
                                          }else{
                                            return <span>先生</span>
                                          }
                                        })()
                                      }
                                    </div>
                                    {
                                      item.gender==="2" ? <img src={loadImage("icon_copy_girl@3x.png")} alt="" style={{height:"0.14rem",marginLeft:"0.05rem",marginTop:"0.03rem"}}/>
                                        :  <img src={loadImage("icon@3x_boy.png")} alt="" style={{height:"0.14rem",marginLeft:"0.05rem",marginTop:"0.03rem"}}/>
                                    }
                                </div>
                                <span className={"ml20 mr20"}>
                                    {item.age}岁
                                </span>
                                <span>
                                  手机号：{item.phone}
                                </span>
                              </div>
                            <div>
                                {item.createTime} 发起预约
                            </div>
                          </div>
                      </div>

                        <div className={"df jcb aic bg-white pt20 pb20 pr15 pl15"}>
                            <div className={"df aic"}>
                              <span className={"orange"}>#{item.tag}#</span>
                            </div>
                            <div className={"btn-wrap"}>
                                {removeRecord &&  <span className={"btn btn-default btn2 grey"} onClick={()=>removeRecord(item.id)} style={{padding:"0.03rem 0.2rem"}}>删除</span>}
                            </div>
                        </div>
                    </div>
              ))
          }
      </div>
    );
  }
}
