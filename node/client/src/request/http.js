import axios from "axios"
// import {baseHostUrlApi} from "../enums/enums";
import { isDev } from "../config/config";
import { errorFun } from "../static/js/public"

//获取数据
let mock=" https://easy-mock.com/mock/5b1f3f4f7deaef37dc71f2ad/BG-mobile";
let dev="//testbgapi.yidianling.com/v1";
let pro="//bgapi.yidianling.com/v1";
let baseUrl="";

switch( isDev ){
  case "mock": baseUrl=mock;break;
  case "dev": baseUrl=dev;break;
  case "pro": baseUrl=pro;break;
  default:baseUrl=null;
}

function getUserInfo(){
  let userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    return JSON.parse(userInfo);
  }else{
    return {}
  }
}


const callApi = (url, method, data={}, callBack, cbFail,filterFun) => {
  if(data===null){data={}}
  data=Object.assign(data,getUserInfo());
  return axios(Object.assign({}, {
    baseURL: baseUrl,
    url,
    method,
    // headers:getUserInfo(),
    params: method === 'get' ? data : {}, // 添加在请求URL后面的参数
    data: method !== 'get' ? data : {}, // 适用于 PUT POST PATCH
    // withCredentials: true, // 请求时是否携带cookie  //当true时要后台也配
  }))
    .then(res => {
    //去掉axios外层包装层
    let result=res.data;
      //通用方法处理（用户未登陆，登陆过期，服务器错误,数据处理等）
      if(result){
        errorFun(result);
      }
    //数据处理
    result.code==="200" && filterFun && (result.data=filterFun(result.data));
    return result;
  })
    //return出要数据；
    .then(result=>result.data)
}

export let get= (url, data={},callBack,cbFail,filterFun) => callApi(url, 'get',data,callBack,cbFail,filterFun);
export let post= (url, data={},callBack,cbFail,filterFun) => callApi(url, 'post',data,callBack,cbFail,filterFun);

