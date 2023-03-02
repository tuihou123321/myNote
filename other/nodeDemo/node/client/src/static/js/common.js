import $ from "jquery"
import {setParams} from "./active"

export function changeWeekDay(d){
    let x;
    // let d=new Date().getDay();
    switch (d){
        case 0:x="星期日";
            break;
        case 1:x="星期一";
            break;
        case 2:x="星期二";
            break;
        case 3:x="星期三";
            break;
        case 4:x="星期四";
            break;
        case 5:x="星期五";
            break;
        case 6:x="星期六";
            break;
    }
    return x;
}
export function removeBlank(str){
    if(str){
        str=str.toString();
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
    let re = /^1[2|3|4|5|7|8][0-9]{9}$/;
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
//从右到左依次算
export function getLastParam(index=0){
    return window.location.pathname.split("?")[0].split("/").reverse()[index];
    // if(window.location.hash){
    //     return window.location.hash.split("?")[0].split("/").reverse()[index];
    // }
    // else{
    //     return window.location.pathname.split("?")[0].split("/").reverse()[index];
    // }
}

export function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
//状态保持的原则，在离开页面时存储当前page的state,刷新初始化数据
export function saveState({lists,page,initialPage,tabs}){
    if(lists && lists.length>0){
        let pageState={
            lists,
            page,
            initialPage,
            scrollTop:$(window).scrollTop(),
            tabs
        }
        let pageStateName=window.h.location.pathname.split("/")[1];
        window.LStorage.setItem(pageStateName,JSON.stringify(pageState))
    }
}

export function goBackApp() {
    //action_name,params,_url
    setParams("gonghui",{},"home");
}

export function getDeviceInfo(){
    console.log(navigator.userAgent);
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
       return "ios"
    } else if (/(Android)/i.test(navigator.userAgent)) {
      return "android"
    } else {
       return "pc"
    }
}

export let LStorage={
    getItem: function (key) {
        let value
        try {
            value = localStorage.getItem(key)
        } catch (ex) {
// 开发环境下提示error
            console.error('window.LStorage.getItem报错, ', ex.message)
        } finally {
            return value
        }
    },
    setItem: function (key, value) {
        try {
// ios safari 无痕模式下，直接使用 window.LStorage.setItem 会报错
            localStorage.setItem(key, value)
        } catch (ex) {
// 开发环境下提示 error
            console.error('window.LStorage.setItem报错, ', ex.message)
        }
    }
}

export function goToLogin(){
    localStorage.clear();
    window.h.push("/login");
}

