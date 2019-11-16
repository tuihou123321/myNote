import React from 'react';
import { goToLogin,getParameterByName } from "./common";
import {Modal} from "antd-mobile"
import {isDev} from "../../config/config"
import urlencode from "urlencode"
import { isAliOrWx } from "../../utils/common";

const mAlert = Modal.alert;

let alertCanShow=true;

//限制只能弹出一次；
const showAlert = (msg) => {
  mAlert("出错了",msg, [
    { text: '取消', onPress: () => alertCanShow=true, style: 'default' },
    { text: '重新加载', onPress: () => window.location.reload() },
  ]);
};

export function errorFun(result) {
  console.log(result);
  let { code, msg } = result;
  if (code === "401" || code === 401) {
    if(!localStorage.getItem("noGo")) {
      goToLogin();
    }
  }
  else if(code !== "200" ) {
    if(alertCanShow) {
      alertCanShow = false;
      msg && showAlert(msg);
    }
  }
}
let dev="http://testbgapi.yidianling.com/v1";
let pro="https://bgapi.yidianling.com/v1";
let baseUrlApi = isDev==="dev" ? dev : pro;

//通过支付宝，微信充值
export function getToRechargeUrl(){
  let userInfo=localStorage.getItem("userInfo");
  let {accessToken,uid} = JSON.parse(userInfo);
 return `${baseUrlApi}/pay/to-recharge/?uid=${uid}&accessToken=${accessToken}`
}

//通过支付宝，微信支付,支付成功后直接跳转到当前下单页面；
export function affirmPay(payId,payTypeId){
  //判断是不是在微信中，本地是否有bgAppId,如果没有就获取
  const appId=localStorage.getItem("bgAppId") || "";
  const userInfo=localStorage.getItem("userInfo");
  const {accessToken,uid} = JSON.parse(userInfo);
  payTypeId= payTypeId === 1 ? (isAliOrWx()==="wx"? "wxpay_mp" : "wxpay") : "alipay";
  //判断是不是在微信当中
  let paramsString=`payId=${payId}&type=${payTypeId}&uid=${uid}&accessToken=${accessToken}&returnUrl=${urlencode(window.location.href)}`;
  window.location.href=`${baseUrlApi}/pay/to-pay/?${paramsString}&from=bg&appId=${appId}`
}

// //通过支付宝，微信支付；
// export function affirmPay(payId,payTypeId){
//   let userInfo=localStorage.getItem("userInfo");
//   let {accessToken,uid} = JSON.parse(userInfo);
//   payTypeId= payTypeId === 1 ? "wxpay" : "alipay";
//   let {hostname,port,protocol}=window.location;
//   //获取跳转回来的地址
//   let hostUrl=!port ? `${protocol}//${hostname}` : `${protocol}//${hostname}:${port}`;
//   let endUrl=window.location.href.replace(hostUrl,"");
//   let returnUrl=urlencode(`${hostUrl}/PayState?url=${endUrl}`);
//   // console.log(`${hostUrl}/pay/to-pay/?payId=${payId}&type=${payTypeId}&uid=${uid}&accessToken=${accessToken}&returnUrl=${returnUrl}`);
//   //通过微信 ，支付宝直接支付
//   window.location.href=`${baseUrlApi}/pay/to-pay/?payId=${payId}&type=${payTypeId}&uid=${uid}&accessToken=${accessToken}&returnUrl=${returnUrl}`
// }

export function setDocumentTitle(){
  document.title="";
}

export function goBack(url){
  if(window.location.href.includes("from")){
    window.h.push(getParameterByName("from"));
    return;
  }
  if(url){
    window.h.push(url);
    return;
  }
  window.history.back()
}
