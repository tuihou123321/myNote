import {getDeviceInfo} from "./common"

let browser = getDeviceInfo();
window.sendDataToOC = function(params) {
};
if(browser == 'ios') {
    window.sendDataToOC = function(params) {
        try {
            window.webkit.messageHandlers.javascriptHandler.postMessage({
                "type": "turnAction3",
                "callBack": {
                    "callBackName": "checkData2"
                },
                "postParameter": {
                    "flag": "1"  //应该跳出整个页面了
                }
            });
            return "ios"
        } catch (err) {
            return "nonsupport"
        }
    }
} else {//android
    window.sendDataToOC = function(params) {
        let a = '';
        a = JSON.stringify(params);
        try {
            window.javascriptHandler.sendDataToOC(a);
        }catch(err){
            console.log(err);
        }
    };
}

//组装传入参数,调用的方法
export function setParams(action_name,params,_url) {
    let data = {
        url:_url,
        cmd:{
            action_name:action_name,
            params:params
        }
    };
    console.log(data);
    window.sendDataToOC(data);
}
