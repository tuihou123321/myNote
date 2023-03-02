
// 微信分享
export function wechatShare(params) {
    if (!params) {return false;}
    //异步引入weixin-js-sdk, package.json要写入
    const wx = require("weixin-js-sdk");
    let obj = {
        url: window.location.href
    };
    //weixinShare 是封装一个API请求接口，向后端获取相应的验签信息
    weixinShare(obj).then(res => {
        wx.config({
            debug: false,
            appId: res.wxConfig.appid,  //每个商户户都有一个唯一的appId
            nonceStr: res.wxConfig.noncestr,
            timestamp: res.wxConfig.timestamp,  //时间戳
            signature: res.wxConfig.signature, //指纹
            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareQZone"]  //注入一些方法
        });

        //分享的一些参数
        let shareData = {
            title: params.title,
            desc: params.desc,
            link: res.wxConfig.url,
            imgUrl: params.cover,
            success: function (res) { },
            cancel: function () { }
        };

        wx.ready(function () {
            wx.onMenuShareAppMessage({ ...shareData });
            wx.onMenuShareTimeline({ ...shareData });
        });
    });
}


//封装调用
function wxShare (props){
    const { cover, pageTitle, desc } = props;
    let wechatParams = {
        cover: cover ? cover : "http://static.ydlcdn.com/v1/images/favicon.xn.ico",
        title: pageTitle,
        desc: desc ? delHtmlTag(desc) : pageTitle  //delHtmlTag方法去掉空格
    };
    //微信分享
    wechatShare(wechatParams);
}


// 参考： https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#1
