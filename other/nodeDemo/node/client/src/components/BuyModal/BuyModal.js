/**
 * Created by mqd on ${DATE}.
 */
import React, { Component, Fragment } from 'react';
import { Icon,Toast, Modal, Button } from 'antd-mobile';
import Popup from "../Popup/PopupPay"
import {getUserDetail} from "../../api/api"
import {loadImage} from "../../utils/common";
import {getLastParam} from "../../static/js/common"
import { affirmPay } from "../../static/js/public"
import { payLoadType } from "../Popup/enums/enums"
import PropTypes from "prop-types"

let typeLists=[
  {
    modal:"test",   //测评模块
    name:"测评",
    payType:"付款"
  },
  {
    modal:"course",   //课程模块
    name:"课程",
    payType:"付款"
  },
  {
    modal:"confide",  //倾述模块
    name:"倾诉",
    payType:"充值"
  }
]
//支付流程-------

// 余额充足直接通过余额购买
// 余额不足通过支付宝或者微信支付
export default class BuyModal extends Component {
  static propTypes={
    applyFee: PropTypes.number, //价格buy
    payApi: PropTypes.func, //下单接口
    buySuccessFun: PropTypes.func, //购买成功后的回调
  }
  state = {
    showPopup:false, //是否显示代部弹窗
    Balance:0,  //企业余额
    payTypeId:payLoadType[0].id, //支付方式，alipay,weixin
    showContact:false,  //是否显示联系管理员图片
    companyManager:"",
    name:""
  }
  //入口方法，购买系统课程
  buy = () => {
    //如果钱不够，就去支付
    let {Balance}=this.state;
    let {maxCoupon,applyFee}=this.props;
    //余额不足
    let totalMoney = maxCoupon ? maxCoupon + Balance : Balance;
    console.log(totalMoney,Balance);
    if(totalMoney<applyFee){
      this.setState({
        isShowNoEnough:true
      })
    }else{
      //弹出支付面板
      this.setState({
        showPopup:true
      })
    }
  }
  componentDidMount() {
    this.getCompanyBalance();
    let name=this.findName();
    this.setState({
      name
     })
  }
  getCompanyBalance(){
    getUserDetail(null, (result) => {
      console.log(result,'result')
      let {companyMoney,contactName}=result;
        this.setState({
          Balance:companyMoney,
          companyManager:contactName
        })
    });
  }
  hideModal = () => {
    this.setState({
      showPopup: false,
    });
  }
  //使用余额支付
  startPay=()=>{
    let id=getLastParam();
    this.props.payApi({id:id},(result)=>{
      let {payMoney,payId}=result;
      console.log(payMoney*1>0);
      if(payMoney*1>0){
        //登陆不足够,通过第三方支付
        affirmPay(payId,this.state.payTypeId);
      }else{
        Toast.success("购买成功");
        //购买成功
        this.setState({
          showPopup:false,
        })
        this.props.buySuccessFun();
      }
    })
  }
  //获取payId
  getPayId=(payTypeId)=>{
    Toast.loading("加载中");
    let id=getLastParam();
    //获取payId
    this.props.getPayIdApi({
      id
    },(result)=>{
      if(result.payId){
        affirmPay(result.payId,payTypeId);
        Toast.hide();
      }else{
        Toast.hide();
        Toast.fail("无效的payId");
      }
    })
  }
  payForBuy=()=>{
    let {payTypeId}=this.state;
    this.getPayId(payTypeId)
  }
  showPopupFun=()=>{
    let { Balance, applyFee }=this.state;
    //判断金额是否足够
    if(Balance<applyFee){
      this.setState({
        isShowNoEnough:true
      })
    }else{
      this.setState({
        showPopup: true,
      });
    }
  }
  findName=()=>{
    let name="";
    let url=window.location.href;
    typeLists.forEach((item,index)=>{
        if(url.indexOf(item.modal)>=0){
           name=item.name;
        }
    })
    return name;
  }

  changePayType=(payTypeId)=>{
    this.setState({
      payTypeId
    })
  }
  //保留二位小数，向上取整
  MathCeil=(value)=>{
    value=value.toFixed(2);
    return value;
}
  render() {
    let {Balance,showPopup,payTypeId,companyManager,name}=this.state;
    let { applyFee,maxCoupon }=this.props;
    let {startPay,hideModal,changePayType}=this;
    let isEnought = maxCoupon ? ((Balance + maxCoupon - applyFee)>=0) : ((applyFee-Balance)>=0);
    return (
      <div>
        <div className={"opcity-white"}/>
        <Popup {...{showPopup, Balance, applyFee,payTypeId,startPay, hideModal,changePayType,maxCoupon}}/>
        <Modal
          transparent
          closable={true}
          visible={this.state.isShowNoEnough}
          onClose={()=>this.setState({isShowNoEnough:false})}
          animationType="slide-up"
        >
          <div className={"tac"}>
            <img src={loadImage("ico_pop_yebz@2x.png")} alt="" className={"w50 mb5"}/>
            <h3 className={"n pb10 fz15 c2"}>余额不足</h3>
            <div className={"mb25 c9 fz11"}>
              <p>该{name}需补充余额{maxCoupon ? this.MathCeil(applyFee-Balance-maxCoupon): this.MathCeil(applyFee-Balance)}元</p>
              <p>请立即支付或联系管理员{companyManager}申请充值</p>
            </div>
            <div className={"df"}>
              <Button type={"ghost"} className={"fx1 fz14"} onClick={()=>this.setState({showContact:true,isShowNoEnough:false})}>联系管理员</Button>
              <div className={"w10"}/>
              <Button type={"primary"} className={"fx1 fz14"} onClick={()=>{
                this.setState({
                  isShowNoEnough:false,
                  showPopup:true
                })
              }}>立即支付</Button>
            </div>
          </div>
        </Modal>

        <Modal
          transparent
          visible={this.state.showContact}
          onClose={()=>this.setState({showContact:false})}
          animationType="slide-up"
          className={"contactWXWrap"}
        >
          <a href={"javascript:void(0)"} className={"abs t15 r5 c6 p5 bg-white"} onClick={()=>this.setState({showContact:false})}>
            <Icon type={"cross"}/>
          </a>
          <img src={loadImage("img_pop_ewm@2x.png")} alt="" className={"w250"}/>
        </Modal>
      </div>
    );
  }
}
