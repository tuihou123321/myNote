/**
 * Created by mqd on ${DATE}.
 */
import React, { Component, Fragment } from 'react';
import { Icon,Toast, Modal, Button } from 'antd-mobile';
import Popup from "../../../components/Popup/Popup"
import {getUserDetail} from "../../../api/api"
import {loadImage} from "../../../utils/common";
import {getLastParam} from "../../../static/js/common"
import { affirmPay } from "../../../static/js/public"
import { payLoadType } from "../../../components/Popup/enums/enums"
import PropTypes from "prop-types"

// 余额充足直接通过余额购买
// 余额不足通过支付宝或者微信支付
export default class BuyModal extends Component {
  static propTypes={
    applyFee: PropTypes.number, //价格
    payApi: PropTypes.func, //购买接口
    getPayIdApi: PropTypes.func, //获取payId,下单接口
    buySuccessFun: PropTypes.func, //购买成功后的回调
  }
  state = {
    showPopup:false, //是否显示代部弹窗
    Balance:0,  //企业余额
    payTypeId:payLoadType[0].id, //支付方式，alipay,weixin
    showContact:false  //是否显示联系管理员图片
  }
  componentDidMount() {
    this.getCompanyBalance();
  }
  getCompanyBalance(){
    getUserDetail(null,(result)=>{
      let {companyMoney}=result;
      if(companyMoney){
        this.setState({
          Balance:companyMoney
        })
      }
    });
  }
  hideModal = () => {
    this.setState({
      showPopup: false,
    });
  }
  //使用余额支付
  payForBalance=()=>{
    this.props.payApi({id:this.state.id},(result)=>{
      Toast.success("购买成功");
      //购买成功
      this.setState({
        showPopup:false,
      })
      this.props.buySuccessFun();
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
  //购买系统课程
  buy=()=>{
    //如果钱不够，就去支付
    let {Balance}=this.state;
    // //余额不足情况
    Balance<this.props.applyFee ? this.payForBuy() : this.payForBalance();
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
  changePayType=(payTypeId)=>{
    this.setState({
      payTypeId
    })
  }
  render() {
    let {applyFee,Balance,showPopup,payTypeId}=this.state;
    let {buy,hideModal,changePayType}=this;
    return (
      <div>
        <div className={"opcity-white"}/>
        <Popup {...{showPopup, Balance, applyFee,payTypeId,buy,hideModal,changePayType}}/>
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
              <p>该课程需补充余额{(applyFee-Balance).toFixed(2)}元</p>
              <p>请立即支付或联系管理员申请充值</p>
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
