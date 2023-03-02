import {Toast} from "antd-mobile"
import axios from "axios"
import md5 from "md5"
import {isDev} from "../config/config";

//获取数据
let mock="https://easy-mock.com/mock/5b1f3f4f7deaef37dc71f2ad/BG-mobile";
let dev="http://testbgapi.yidianling.com/v1";
let pro="";
let baseUrl="";

switch(isDev){
  case "mock": baseUrl=mock;break;
  case "dev": baseUrl=dev;break;
  case "pro": baseUrl=pro;break;
}

export let get=((url,params,callback,cbFail)=>{
})

export let post=((url,params,callback,cbFail)=>{
  if(!params){
    params={}
  }
  let userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    let {accessToken,uid} = JSON.parse(userInfo);
    params.accessToken=accessToken;
    params.uid=uid;
  }
  url=baseUrl+url;
  //证书生成key
  // let sessionKey="dc59cf294f37d237c1f06240568ffe21";
  // let key="a=1&b=2"+sessionKey; //注意参数的排序，a,ab,ac
  //  key="Ydl"+" "+md5(key);
  // console.log(params);

  axios.defaults.headers.post['Content-Type']='application/json;charse=UTF-8'
  axios({
    method: 'post',
    params: params,
    transformRequest:[function () {
      return JSON.stringify(params)
    }],
    url: url
  }).then((res) => {
    let result=res.data;
    if(result.code==200){
      if(callback){
        callback(result.data);
      }
    }
    else if(result.code==401){
      //重新登陆
      Toast.info("登陆超时，请重新登陆");
      localStorage.clear();
      window.location.href="/login";
    }
    else{
      //报错
      Toast.fail(result.msg);
      console.log(result.msg);
      if(cbFail){
        cbFail(result);
      }
    }
  }).catch((err) => {
    err=err.toString();
    Toast.fail(err);
    console.log(err);
  })

})

export default {
  get,
  post
}
