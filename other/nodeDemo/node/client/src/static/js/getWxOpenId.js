import urlencode from "urlencode"
import {getAppId, getOpenId} from "../../api/api"
import {Toast} from "antd-mobile"
import {getParameterByName} from "./common";


function getCode(){
    let currentUrl=window.location.href;
    localStorage.setItem("oldPathname",currentUrl);
    let REDIRECT_URI=urlencode(currentUrl);
    let SCOPE="snsapi_base";
    // let SCOPE="snsapi_userinfo";
    //通过这个URL获取到token,获取到后会重定向到新的URL上面
    getAppId({},(data)=>{
      window.location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${data.appId}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}&state=STATE#wechat_redirect`
    });
}

function getuId(code){
    //向自己的服务器开始登陆,这一步也要token验证，所以会执行两个wxLogin的方法
    Toast.loading("加载中...",0);
    getOpenId({code:code},(result)=>{
        Toast.hide();
        let { openId }=result;
        localStorage.setItem("bgOpenId",openId);
    });
}

export function getWxOpenId(){
    //先判断用户有没有登陆，没登陆微信自动登陆，并且后台获取到token（并存储在localStorage）
    //微信自动登陆，获取到微信传过来的code
    const code= getParameterByName('code');
    code ? getuId(code) : getCode();
}

