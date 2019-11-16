/**
 * Created by mqd on ${DATE}.
 */
import React, { Component, Fragment } from 'react';
import { Icon, Modal, Button } from 'antd-mobile';
import {getUserDetail} from "../../api/api"
import {loadImage} from "../../utils/common";
import {getLastParam} from "../../static/js/common"
import PropTypes from "prop-types"

// 余额充足直接通过余额购买
// 余额不足通过支付宝或者微信支付
export default class ConfideBuyModal extends Component {
  static propTypes={
    applyFee: PropTypes.number,
  }
  state = {
    Balance:0,  //企业余额
    showContact:false,  //是否显示联系管理员图片
    companyManager:"",
    head:""
  }
  connect=()=>{
    window.h.push(`/confide/calling/${getLastParam()}`)
  }
  buy=()=>{
    //如果钱不够，就去支付
    let {Balance}=this.state;
    //余额不足
    if(Balance<this.props.applyFee){
      this.setState({
        isShowNoEnough:true
      })
    }else{
     //直接连接，不用再下单
       this.connect();
    }
  }
  componentDidMount() {
    this.getCompanyBalance();
  }
  getCompanyBalance(){
    getUserDetail(null,(result)=>{
      let {companyMoney,contactName,head}=result;
        this.setState({
          Balance:companyMoney,
          companyManager:contactName,
          head
        })
    });
  }
  //跳转到充值界面
  goToPayPage=()=>{
    let id=getLastParam();
    //把当前企业余额存入localStorage中，用于判断充值后是后成功
    localStorage.setItem("balance",this.state.Balance);
    //此时应该自动获取参数url 更好些；
    window.h.push(`/pay/${id}?url=/confide/detail/${id}`);
  }
  render() {
    let {Balance,companyManager}=this.state;
    let { applyFee }=this.props;
    return (
      <div>
        <div className={"opcity-white"}/>
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
              <p>本次连接最低需要补充金额{(applyFee-Balance).toFixed(2)}元</p>
              <p>请立即支付或联系管理员{companyManager}申请充值</p>
            </div>
            <div className={"df"}>
              <Button type={"ghost"} className={"fx1 fz14"} onClick={()=>this.setState({showContact:true,isShowNoEnough:false})}>联系管理员</Button>
              <div className={"w10"}/>
              <Button type={"primary"} className={"fx1 fz14"} onClick={()=>{
                this.goToPayPage();
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
