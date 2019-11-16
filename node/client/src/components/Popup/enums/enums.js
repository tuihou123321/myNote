import {isAliOrWx} from "../../../utils/common";

let payLoadTypeAll=[
  {
    id:1,
    name:"微信支付",
    img:"ico_wx@3x.png",
    typeName:"wxpay",
  },
  {
    id:2,
    name:"支付宝支付",
    img:"ico_zfb@3x.png",
    typeName:"alipay",
  }
]

//如果是微信打开隐藏支付宝
export let payLoadType=isAliOrWx()==="wx" ? [payLoadTypeAll[0]] : payLoadTypeAll;

