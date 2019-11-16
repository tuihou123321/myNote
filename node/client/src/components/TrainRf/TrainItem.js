import React, { PureComponent } from 'react';
import {changeWeekDay} from "../../static/js/common"
import classNames from "classname"


export default class TrainItem extends PureComponent {
  constructor(props, context) {
    super(props, context);
  }
  state = {
  }
    changeWeekDayB=(time)=>{
        if(!time){return}
        let a=new Date(time).getDay();
        return changeWeekDay(a);
    }
  //改变时间样式类型
  changeTimeType=(time)=>{
    time=time.split(":");
    return `${time[0]}:${time[1]}`;
  }
  componentDidMount(){
  }
  render() {
      let {removeRecord,lists}=this.props;
    return (
      <div>
          {
            lists && lists.map((item,index)=>(
                    <div className={classNames("pb10",{"bdb5grey":index+1!==lists.length})} key={index}>
                      <div className={"df jcb ptb20 plr10 bg-white acc"}>
                          <h4 className={"fz17 line1 fx1"}
                              style={{WebkitBoxOrient: "vertical"}}>
                              {item.trainTime} {this.changeWeekDayB(item.trainTime)} {item.amPm==="1"?"上午":"下午"}
                              </h4>
                          <span className={"w20"}/>
                          {
                              item.status==="2"?<span className={"fz12 white bg-green pr5 pl5 bdrs3"} style={{lineHeight:"0.25rem"}}>已确认</span>:<span className={"fz12 white bg-orange pr5 pl5 bdrs3"} style={{lineHeight:"0.25rem"}}>待确认</span>
                          }
                      </div>
                      <div className={"bg-grey-light p10 fz14"}>
                          <div className={"c6 "}>
                              <p className={"aic dib mb5"}>
                                  <span className={"mr20"}>联系人：{item.contactName}</span>
                                  <span>手机号：{item.phone}</span>
                              </p>
                              <div className={"fz12 grey"}>
                                  <p>单位名称 ：{item.company}</p>
                                  <p>{this.changeTimeType(item.createTime)} 发起预约</p>
                              </div>
                          </div>
                      </div>
                        <div className={"df jcb aic bg-white p10"}>
                            <div className={"df aic"}>
                            </div>
                            <div className={"btn-wrap"}>
                                {removeRecord && <span className={"btn btn-default btn2 grey"} onClick={()=>removeRecord(item.id,index)} style={{padding:"0.03rem 0.2rem"}}>删除</span>}
                            </div>
                        </div>
                    </div>
              ))
          }
      </div>
    );
  }
}
