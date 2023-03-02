/**
 * Created by mqd on ${DATE}.
 */
import React, { Component } from 'react';
import { Button,Toast} from 'antd-mobile';
import { getConnectState,cancelState } from "../../api/api"
import {getLastParam, loadImage} from "../../utils/common";

let arr=[];
for(let i=0;i<5;i++){
  arr.push(i);
}

// let timer="";
export default class ConfideCalling extends Component {
  state = {
      activeIndex:0,
      showEndPanel:false,
      showBox2:false,
      callId:"",
      relationId:"",
      head:null,
      timer:""
  }
  //倒计时
  countDown=()=>{
    //1分数后自动退出打电话页面
    let overTime=1*60;
    let timer=setTimeout(()=>{
      window.history.back();
    },overTime*1000)

    this.setState({
      timer
    })
  }
  connetState=()=>{
    let params={
      id:getLastParam()
    }
    getConnectState(params,(result)=>{
      let {callId,relationId}=result;
      this.setState({
        callId,
        relationId
      })
      this.countDown();
    },(msg)=>{
      if(msg==="未登录"){
        msg="老师未登陆";
      }
      Toast.fail(msg,3,()=>{
        // window.history.back();
      });
    })
  }
  connetStateAxb=()=>{
    let params={
      id:getLastParam(),
      isAxb:true
    }
    getConnectState(params,(result)=>{
      let {onePhone}=result;
      if(onePhone){
        window.location.href="tel:"+onePhone;
      }else{
        Toast.info("无法获取号码，请重试")
      }
    })
  }
  componentDidMount() {
    let head=sessionStorage.getItem("teacherImg");
    if(head!==null){
      this.setState({head})
    }
    this.connetState();
    //动态小点
    let timer2=setInterval(()=>{
      let {activeIndex}=this.state;
      if(activeIndex<arr.length){
        this.setState({
          activeIndex:activeIndex+1
        })
      }
      else{
        this.setState({
          activeIndex:0
        })
      }
    },400)
    //当离开这个路由的时候，就关闭这个定时器
    this.props.history.listen((location, action)=>{
      if(this.state.timer){
        clearTimeout(this.state.timer);
        clearInterval(timer2);
        this.setState({
          timer:""
        })
      }
    })
  }
  stopCalling=()=>{
    let {callId,relationId}=this.state;
    let params={
      callId,
      relationId
    }
    cancelState(params,(result)=>{
      let {status}=result;
      if(status===1){
        window.history.back();
        Toast.success("已挂断",3)
      }
      else{
        Toast.fail("出错了",3,()=>{
          window.history.back();
        })
      }
    },(msg)=>{
      Toast.fail(msg,3,()=>{
        window.history.back();
      })
    })
  }
  closeFun(){
    this.setState({
      showEndPanel:false
    })
  }
  showStopCalling=()=>{
    this.setState({
      showEndPanel:true
    })
  }
  render() {
    // let { history } = this.props;
    let box1= (
      <div>
      <div className={"fix z5"} style={{marginTop:"2.38rem"}}>
        <div className={"bg-white bdrs10 p10 ml40"} style={{width:"2.6rem"}}>
          <div className={"pb20"}>
            <a  className={"fr"} onClick={()=>this.closeFun()}>
              <img src={loadImage("close@2X.png")} alt="" className={"w15"}/>
            </a>
          </div>
          <div className={"tac p20"}>
            <h1 className={"mb30 fz18 c3"}>立即挂断，不再接听？</h1>
            <div className={"mb20"}>
              <Button type={"primary"} onClick={()=>this.closeFun()}>继续接听</Button>
            </div>
            <div>
              <Button type={"warning"} onClick={this.stopCalling}>确定挂断</Button>
            </div>
          </div>
        </div>
      </div>
      <div style={{height:"6.67rem"}} className={"w100p bg-black abs t0 op5"}>
      </div>
    </div>
    )

    let box2= (
      <div>
        <div className={"fix z5"} style={{marginTop:"2.38rem"}}>
          <div className={"bg-white bdrs10 p10 ml40"} style={{width:"2.6rem"}}>
            <div className={"pb20"}>
              <a  className={"fr"} onClick={()=>window.history.back()}>
                <img src={loadImage("close@2X.png")} alt="" className={"w15"}/>
              </a>
            </div>
            <div className={"tac p20"}>
              <h1 className={"mb30 fz18 c3"}>
                通话时间已到25分钟<br/>
                电话将自动挂断
              </h1>
              <div className={"mb20"}>
                <Button type={"primary"} onClick={()=>window.history.back()}>确定</Button>
              </div>
            </div>
          </div>
        </div>
        <div style={{height:"6.67rem"}} className={"w100p bg-black abs t0 op5"}>
        </div>
      </div>
    )

    return (
      <div style={{background:"#0a111c",height:"6.67rem"}} className={"w100p"}>
        {this.state.showEndPanel && box1}
        {this.state.showBox2 && box2}
         <div className={"df aic pt60 pb40"}>
           <div className={"fx1 tar"}>
             {this.state.head===null ? <img src={loadImage("head_nor@3X.png")} alt="" className={"w80 h80 bdrs50p"}/>:<img src={this.state.head} alt="" className={"w80 h80 bdrs50p"}/>}
           </div>
           <div className={"w100 tac"}>
             {
               arr.map((item,index)=>{
                 return <span key={index} className={"dib w8 h8 bg-grey bdrs50p mr5"} style={this.state.activeIndex===index?{ background:"#3d9eff"}:{background:null}}/>
               })
             }
           </div>
           <div className={"fx1 tal"}>
             <img src={loadImage("head_nor@3X.png")} alt=""  className={"w80 h80 bdrs50p tac"}/>
           </div>
         </div>

        <div className={"tac white fz16"}>
          正在匿名连接双方电话<br/>
          来电号码非固定号码<br/>
          一般为950开头<br/>
          如60秒后未接通，挂断后可重新连接<br/>
        </div>

        <div className={"fix b20 tac r0 l0"}>
          <div className={"mb20"} onClick={this.showStopCalling}>
            <a href="javasript:void(0)">
              <img src={loadImage("hang_nor@3X.png")} alt="" className={"w80 h80"}/>
            </a>
          </div>
          <div className={"tac c6"}>
             默认通话时间最长为25分钟<br/>
             如意外中断，请重新拨打
          </div>
        </div>
        </div>
    );
  }
}
