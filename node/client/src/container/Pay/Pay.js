import React, { Component } from 'react';
import Layout from "../../layout/Layout"
import {Button, InputItem, Toast} from "antd-mobile"
import PayType from "../../components/Popup/PayType";
import { payLoadType } from "../../components/Popup/enums/enums";
import {getToRechargeUrl} from "../../static/js/public"
import classNames from "classname"
import {getParameterByName} from "../../static/js/common";
import urlencode from "urlencode"

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

let payMoney=[50,100,150,200,300]


export default class Pay extends Component {
  state = {
    checkedItem:payMoney[0],
    payTypeId:payLoadType[0].id,
    showPopup:false,
    enterMoney:""
  }
  //去充值
  goToRecharge=()=>{
    let { checkedItem, payTypeId,enterMoney }=this.state;
    let type= payTypeId === 1 ? "wxpay" : "alipay";
    checkedItem=checkedItem || enterMoney;
    if(!checkedItem){
      Toast.info("请选择金额");
      return;
    }
    let {hostname,port,protocol}=window.location;
    let hostUrl=!port ? `${protocol}//${hostname}` : `${protocol}//${hostname}:${port}`;
    let returnUrl2=urlencode(getParameterByName("url"));
    let returnUrl=urlencode(`${hostUrl}/PayState?url=${returnUrl2}`);
    let payUrl = getToRechargeUrl() + `&money=${checkedItem}&type=${type}&returnUrl=${returnUrl}`;
    window.location.href=payUrl;
  }
  enterMoneyFun=()=>{
    this.changePayType();
    this.setState({
      showPopup:true
    },()=>{
      this.refs.inputItem.focus();
    })
  }
  //提交自定义money
  submit=()=>{
    this.closePayModal();
  }
  closePayModal=()=>{
    this.setState({
      showPopup:false
    })
  }
  changePayType=(checkedItem)=>{
    this.setState({
      checkedItem
    })
  }
  changePayType2=(payTypeId)=>{
    this.setState({
      payTypeId
    })
  }
  componentDidMount() {
  }
  render() {
    let {checkedItem, payTypeId, showPopup,enterMoney}=this.state;
    let { closePayModal,submit }=this;
    return (
      <Layout title={"充值"} noFooter>
        <div className={"plr20 pt25"}>
          <div className={"mb30"}>
            <h3 className={"pb20"}>充值金额</h3>
            <div className={"df jcb mb15 btnDefaultWrap fxww"}>
              {
                payMoney.map((item,index)=>(
                  <div className={classNames("tabsItem cup",{tabsCurrent:checkedItem===item})} key={index} style={{lineHeight:"0.32rem"}} onClick={()=>{
                    this.setState({
                      checkedItem:item
                    })
                  }}>
                    <span key={index}  onClick={()=>this.changePayType()}>{item}元</span>
                  </div>
                ))
              }
              {
                enterMoney>0 ? <div className={classNames("tabsItem cup",{tabsCurrent:!payMoney.includes(checkedItem)})}  style={{lineHeight:"0.32rem"}}>
                    <span onClick={()=>{this.changePayType();this.setState({showPopup:true})}}>{enterMoney}元</span>
                  </div>
                  :<div className={classNames("tabsItem cup",{tabsCurrent:!payMoney.includes(checkedItem)})}  style={{lineHeight:"0.32rem"}}><span onClick={this.enterMoneyFun}>其他金额</span></div>
              }

            </div>
          </div>
          {/*<PayType payTypeId={payTypeId} payLoadTypeFun={(payTypeId)=>{this.changePayType(payTypeId)}}/>*/}
          <PayType payTypeId={payTypeId} payLoadTypeFun={(payTypeId)=>{this.changePayType2(payTypeId)}}/>
          {
            !isNaN(checkedItem) ? <Button type={"primary"} style={{marginTop:"1.5rem"}} className={"mb40"} onClick={this.goToRecharge}>
              确认支付 ¥ <span className={"fz18"}>{checkedItem}</span>
            </Button>:<Button type={"primary"} style={{marginTop:"1.5rem"}} className={"mb40"} onClick={this.goToRecharge}>
              确认支付 ¥ <span className={"fz18"}>{enterMoney}</span>
            </Button>
          }
        </div>

        {
          showPopup && <div>
            <div className={classNames("w100p fix pb200 z500 bg-white b0")}>
              <div className={"df p15 bdb1"}>
                <div className="fx1 grey fz12" onClick={closePayModal}>取消</div>
                <h4 className={"fx1"}>输入充值金额</h4>
                <div className={"fx1"}/>
              </div>
              <div>
                <div className={"tac aic ptb30"}>
                  <span className={"w30"}>¥</span>
                  {/*<input type="number"/>*/}
                  <InputItem type={"money"}
                             placeholder={"请输入充值金额"}
                             className={"w140 dib tal"}
                             value={enterMoney}
                             ref={"inputItem"}
                             onChange={(value)=>{
                               this.setState({
                                 enterMoney:value
                               })
                             }
                             }/>
                </div>
                <div className={"m15 t0"}>
                  <Button type={"primary"} onClick={submit}>确认</Button>
                </div>
              </div>
            </div>
            <div className={"w100p fix z300 bg-black op3 t0 l0"} style={{height:"10rem"}} onClick={closePayModal}/>
          </div>
        }


      </Layout>
    );
  }
}
