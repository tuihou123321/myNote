import React,{PureComponent, Fragment} from 'react';
import {loadImage} from "../../utils/common";
import {Button,Icon} from "antd-mobile"
import { lists } from "./enums/enums"
import Header from "../../components/Header/Header"
import {getParameterByName} from "../../static/js/common";
import { getUserDetail } from "../../api/api"

let timer=null;
class PayState extends PureComponent{
  state={
    time:5,
    isSuccess:false,
    urlInfo:{
      name:"",
      successDesc:""
    },
    isLoaded:false  //通过动态获取用户id来判断，是否加载完成；
  }
  goBack=()=>{
    let url=getParameterByName("url");
    if(!url){
        url="/"
    }
    window.h.push(url);
  }
  //获取url中的参数
  geturlInfo=()=>{
    // 通过url来判断来源；
    let url=getParameterByName("url");
    console.log(url)
    if(!url){
        return null;
    }
   let selectItem={}
    lists.forEach(item=>{
      if(url.includes(item.url)){
          selectItem=item;
      }
    })
    return selectItem
  }
  //倒计时
  countdown=()=>{
    timer=setInterval(()=>{
      let time=this.state.time;
      if(time>0){
        this.setState({
          time:this.state.time-1
        })
      }else{
        clearTimeout(timer);
        //返回url中的链接
        this.goBack();
      }
    },1000)
  }
  componentDidMount(){
    getUserDetail(null,(result)=>{
      let {companyMoney}=result;
      //这个是充值逻辑，所以一定是有钱的；
        let balance=localStorage.getItem("balance"); //企业余额
        let isSuccess=true;
        //充值成功，余额增加
        if(getParameterByName("url").indexOf("/confide/")>-1){
          isSuccess=companyMoney>balance;
        }
        this.setState({
          isSuccess,
          isLoaded:true
        },()=>{
          this.countdown();
        })
    });
      if (this.geturlInfo()) {
      this.setState({
        urlInfo:this.geturlInfo()
      })
    }
  }
  render(){
    let {name, successDesc}=this.state.urlInfo;
    let { isSuccess, isLoaded } = this.state;
  return (
    <Fragment>
      <Header title={"支付进度"} right={" "}/>
      {
        isLoaded ? <div className={"tac p20 pt60"}>
          <img src={loadImage(isSuccess ? "ico_zfcg@3.png":"ico_zfsb@3x.png")} alt="" className={"w90 h90 pb30"}/>
          <div className={"pb10 fz18"}>支付{isSuccess ? " 成功" : "失败"}</div>
          <p className={"grey"}>{isSuccess ? ` 您已成功付款，${successDesc}`:`您此次付款失败，...`}</p>
          <div className={"mt50"}>
            <Button type="primary"><span>返回{name}详情页 &emsp; {this.state.time}s</span></Button>
          </div>
        </div>:  <div className="tac pt40 pb20">
          <Icon type="loading" size="md"/>
          <p className="grey">加载中...</p>
        </div>
      }
    </Fragment>
  );
}
}

export default PayState;
