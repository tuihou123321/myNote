import {Toast,Modal} from "antd-mobile"
// import axios from "axios"
import {isDev} from "../config/config";
import $ from "jquery"
const mAlert = Modal.alert;

//获取数据
let mock=" https://easy-mock.com/mock/5b1f3f4f7deaef37dc71f2ad/BG-mobile";
let dev="//testbgapi.yidianling.com/v1";
let pro="//bgapi.yidianling.com/v1";
let baseUrl="";

switch(isDev){
  case "mock": baseUrl=mock;break;
  case "dev": baseUrl=dev;break;
  case "pro": baseUrl=pro;break;
  default:baseUrl=null;
}

let msgName=[];
const showAlert = (msg) => {
  if(!msgName.includes(msg)) {
    msgName.push(msg);
    mAlert("出错了", msg, [
      {text: '取消', onPress: () => msgName = [], style: 'default'},
      {text: '重新加载', onPress: () => window.location.reload()},
    ]);
  }
};


export let get=((url,callback)=>{
    $.ajax({
        url: url,
        success: function (data) {
            // if(callback){
                callback(data);
            // }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            showAlert(textStatus);
            /*错误信息处理*/
            // Toast.fail(textStatus);
            localStorage.clear();
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
})

export let post=((url,params,callback,cbFail,filterFun)=>{
  if(!params){
    params={}
  }
  let userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    let {accessToken,uid} = JSON.parse(userInfo);
    params.accessToken=accessToken;
    params.uid=uid;
  }
  let appId=localStorage.getItem("appId");
  if(appId){
    params.appId=appId;
  }

  let username=localStorage.getItem("username");
  if(username){
    localStorage.getItem("username");
    params.username=username;
  }

  //platform ==1 为bg,2为工会
  params.platform=1;
  //dev环境专用
  //   params.accessToken="6cd638b4ab2659042807efa7456978a8";
  //   params.uid="13082537";
  url=baseUrl+url;
  ajaxFun(url,params,callback,cbFail,filterFun);
  // ajaxPost(url,params,callback,cbFail,filterFun);

})


function ajaxFun(url,params,callback,cbFail,filterFun){
$.ajax({
  type: "POST",
  // contentType: "application/json",
  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
  url: url,
  data: params,
  // data: '{"email":"' +99+'"}',
  timeout: 30000, //超时时间：30秒
  dataType: 'json',
  error: function
    (XMLHttpRequest, textStatus, errorThrown){
    //TODO: 处理status， http status code，超时 408
    // 注意：如果发生了错误，错误信息（第二个参数）除了得到null之外，还可能
    //是"timeout", "error", "notmodified" 和 "parsererror"。
    Toast.hide();
    if(!cbFail){
      showAlert("链接超时")
    }
    else{
      cbFail("链接超时")
    }
  },
  success: function(res) {
    let result=res;
    if(result.code == "200"){
      if(callback){
        let {data}=result;
        if(filterFun){
          data=filterFun(data);
        }
        callback(data);
      }
    }
    else if(result.code == "401"){
      localStorage.removeItem("userInfo");
      Toast.fail("登陆超时，请重新登陆",2,()=>{
        window.h.push("/login"); //回到首页
      });
    }
    else{
      Toast.hide();
      if(cbFail){
        cbFail(result.msg);
      }
      else{
        showAlert(result.msg);
      }
    }
  }
});

}

export default {
  get,
  post
}
