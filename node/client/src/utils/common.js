// import {routerType} from "../config/config";
import $ from "jquery"
import {isDev} from "../config/config"

export function removeBlank(str){
  if(str){
    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str=str.replace(/ /ig,'');//去掉
    str=str.replace(/^[\s　]+|[\s　]+$/g, "");//去掉全角半角空格
    str=str.replace(/[\r\n]/g,"");//去掉回车换行
    str=str.replace(/\$\$/gi,"");
  }
    return str;
}

export function checkPhone(str){
    //去掉空格
    str=removeBlank(str);
    let re = /^1[2|3|4|5|6|7|8|9][0-9]{9}$/;
    if(re.test(str)){
        //手机号通过
        return true;
    }
    else if(str===""){
        //手机号不能为空
        return false;
    }
    else{
        //手机号错误
        return false;
    }
}

//只能包含字母和数字
export function checkPassword(value){
  let jgpattern =/^[A-Za-z0-9]+$/;
  if(!jgpattern.test(value)){
    return false;
  }
  else{
    return true
  }
}


export function getCompanyPY(){
  //判断是不是本地调试环境
  let host=window.location.host;
  if(host.indexOf("localhost")<0 && host.indexOf("192.168")<0){
    let companyPY=window.location.host.split(".")[0];
    return companyPY;
  }
  else {
    if(isDev==="mock" || isDev==="dev"){
      return "geely";
    }
    else{
      return "yld"
    }
  }
}

export function delHtmlTag(str) {
  if(!str){return ""}
  //去掉所有的html标记
  if(str){str=str.replace(/<[^>]+>/g,"");}
  str=str.replace(/&nbsp;/gi,"")
  str = str.replace(/\s+/g,"");
  str=removeBlank(str);
  return str;
}

//阻止浏览器的默认行为
export function stopDefault( e ) {
  //阻止默认浏览器动作(W3C)
  if ( e && e.preventDefault )
    e.preventDefault();
  //IE中阻止函数器默认动作的方式
  else
    window.event.returnValue = false;
  return false;
}

//判断用户是不是IOS手机
export function isIOS(){
  let a=false;
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
     a = true;
  }
  return a;
}
//从右到左依次算
export function getLastParam(index=0){
  return window.location.href.split("?")[0].split("/").reverse()[index];
  // if(routerType==="hash"){
  //   return window.location.hash.split("?")[0].split("/").reverse()[index];
  // }
  // else{
  //   return window.location.href.split("?")[0].split("/").reverse()[index];
  // }
}

//转换成时/分/秒
function changeTimeType(arr){
  let a="";
  if(arr[0]!==0){
    a=arr[0]+"时"
  }
  if(arr[1]!=="00"){
    a+=arr[1]+"分"
  }
  if(arr[2]!=="00"){
    a+=arr[2]+"秒"
  }
  return a;
}

export  function formatSeconds(value,isTest) {
  let secondTime = parseInt(value);// 秒
  let minuteTime = 0;// 分
  let hourTime = 0;// 小时
  if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
    //获取分钟，除以60取整数，得到整数分钟
    minuteTime = parseInt(secondTime / 60);
    //获取秒数，秒数取佘，得到整数秒数
    secondTime = parseInt(secondTime % 60);
    //如果分钟大于60，将分钟转换成小时
    if(minuteTime > 60) {
      //获取小时，获取分钟除以60，得到整数小时
      hourTime = parseInt(minuteTime / 60);
      //获取小时后取佘的分，获取分钟除以60取佘的分
      minuteTime = parseInt(minuteTime % 60);
    }
  }
  if(minuteTime<10){
    if(minuteTime===0){
      minuteTime="00";
    }
    else{
      minuteTime="0"+minuteTime;
    }
  }
  if(secondTime<10){
    if(secondTime===0){
      secondTime="00";
    }
    else{
      secondTime="0"+secondTime;
    }
  }
  let result="";
  if(isTest){
    let arr=[hourTime,minuteTime,secondTime];
    result=changeTimeType(arr);
  }
  else{
    if(hourTime!==0){
      hourTime=hourTime+":";
    }
    else{
      hourTime="";
    }
     result=hourTime+minuteTime+":"+secondTime;
  }
  return result;
}


export function scrollToBottom(){
  //判断是不是iphone
  if(isIOS()){
      return false;
  }
  setTimeout(()=>{
    //判断是不是iphone
    const inputFirst=$("#inputFirst").offset().top-80;
    $(document).scrollTop(inputFirst);
  },0)
}

export function removeSplitStrLenght(tags){
  tags=tags.replace(/|/g,"").replace(/,/g,"");
  return tags.length;
}

export function tagsLimit(tags,maxNum,splitStr=","){
  if(!tags){return []}
  if(tags.split(splitStr).length===1){
    if(tags.length>maxNum){
      tags=tags.substring(0,maxNum-2)+"..";
    }
    return [tags];
  }else{
    //去掉分隔符后的长度
    if(removeSplitStrLenght(tags)>maxNum){
      let tagsArr=tags.split(splitStr);
      //删除最后个tags;
      let tagsArr2=[];
      tagsArr.forEach((item,index)=>{
        //依次删除最后一个，看最大值是否小于maxNum;
        if(removeSplitStrLenght(tagsArr2.toString())+item.length<=maxNum){
          tagsArr2.push(item)
        }
      })
      return tagsArr2;
    }else{
      return tags.split(splitStr);
    }
  }
}

//动态加载图片（兼容next.js和　ｒｅａｃｔ项目写法）
export function loadImage(imageName){
  if(!imageName){
      return null;
  }
  return require(`../static/images/${imageName}`)
}

export function filterTime(time, second) {
	let d = new Date(time);
	let Y = d.getFullYear();
	let M = d.getMonth() + 1;
	let D = d.getDate();
	let h = d.getHours();
	let m = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
	let s = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
	if (second) {
		return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
	}
	return Y + '-' + M + '-' + D;
}

export function turnToNumber(value){
  switch (value){
    case "A":value=1; break;
    case "B":value=2; break;
    case "C":value=3; break;
    case "D":value=4; break;
    case "E":value=5; break;
    case "F":value=6; break;
    case "G":value=7; break;
    case "H":value=8; break;
    case "I":value=9; break;
    default:value=value;
  }
  return value;
}

//保留 X.X 万格式
export function changeNumber(number){
  if(number>10000){
    number=number.toString();
    number=number.substring(0,number.length-4)+"."+number.charAt(number.length-4)+"万+"
  }
  return number;
}

//判断是阿里或者微信
export let isAliOrWx = function() {
  let typeBower = '';
  let browser = {
    versions: function() {
      let u = navigator.userAgent,
        app = navigator.appVersion;
      return { //移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
      };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  };
  if(browser.versions.mobile) { //判断是否是移动设备打开。browser代码在下面
    let ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
    if(ua.match(/Alipay/i)=="alipay"){
      typeBower = 'ali';
    }
    if(ua.match(/MicroMessenger/i) == "micromessenger") {
      typeBower = 'wx';
    }
  }
  return typeBower;
};
