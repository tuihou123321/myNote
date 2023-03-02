import {post, get} from "../request/request"
// import {post} from "../request/http"
import { psyListsFilter, articleChangeName } from "./filter/filter"
// import Mock from "mockjs"

//开始登陆
export let getLogin=((params,cbSuccess,cbFail)=>{
  post("/user/login",params,cbSuccess,cbFail);
})

//退出登陆
export let getLogout=((params,cbSuccess)=>{
  post("/user/logout",params,cbSuccess);
})

//重置密码-获取验证码
export let getAuthCode=((params,cbSuccess,cbFail)=>{
  post("/user/send-sms",params,cbSuccess,cbFail);
})


//确认重置密码
export let getAffirm=((params,cbSuccess,cbFail)=>{
  post("/user/reset-pwd",params,cbSuccess,cbFail);
})


//获取用户详细信息
export let getUserDetail=((params,cbSuccess)=>{
  post("/user/detail",params,cbSuccess);
})


//获取公司信息
export let getCompanyInfo=((params,cbSuccess)=>{
  post("/company/get-by-pinyin",params,cbSuccess);
})


//获取用户倾诉列表
export let getUserConfideLists=((params,cbSuccess)=>{
    post("/user-center/my-listen",params,cbSuccess);
})

//获取用户课程列表
export let getUserCourseLists=((params,cbSuccess)=>{
  post("/user-center/my-course",params,cbSuccess);
})

//获取用户课程列表
export let getUserTestingLists=((params,cbSuccess)=>{
  post("/user-center/my-test",params,cbSuccess);
})


//帮助中心
export let getHelpList=((params,cbSuccess)=>{
    post("/help/list",params,cbSuccess);
})

//帮助中心详情
export let getHelpDetail=((params,cbSuccess)=>{
    post("/help/detail",params,cbSuccess);
})


//个人中心
export let getAndroidAppUrl=((params,cbSuccess)=>{
  post("/user-center/apk-link",params,cbSuccess);
})

//个人中心--企业余额
export let getUserBalanceLists=((params,cbSuccess)=>{
    post("/user-center/fund-list",params,cbSuccess);
})



//首页数据
export let getHomeData=((params,cbSuccess)=>{
  post("/home/wap",params,cbSuccess);
})

//退出
export let exit=((params,cbSuccess)=>{
  post("/user/logout",params,cbSuccess);
})

//课程列表
export let getCourseList=((params,cbSuccess)=>{
  post("/course/list",params,cbSuccess);
})

//课程详情
export let getCourseDetail=((params,cbSuccess)=>{
  // return Mock.mock(courseDetail);
  post("/course/detail",params,cbSuccess);
})


//购买课程
export let getCourseBuy=((params,cbSuccess)=>{
  post("/course/buy",params,cbSuccess);
})

//播放列表
export let getCoursePlay=((params,cbSuccess)=>{
  post("/course/play",params,cbSuccess);
})


//课程目录
export let getCourseCatelog=((params,cbSuccess)=>{
  post("/course/cate",params,cbSuccess);
})


//测试首页
export let getTestLists=((params,cbSuccess,cbFail)=>{
  post("/test/list",params,cbSuccess,cbFail);
})

//获取测试题
export let getTestDetail=((params,cbSuccess,cbFail)=>{
  post("/test/detail",params,cbSuccess,cbFail);
})


//获取倾诉列表栏目
export let getConfideCategories=((params,cbSuccess)=>{
  post("/listen/types",params,cbSuccess);
})

//获取倾诉列表
export let getConfideLists=((params,cbSuccess)=>{
  post("/listen/list",params,cbSuccess);
})

//获取倾诉详情
export let getConfideDetail=((params,cbSuccess,cbFail)=>{
  post("/listen/detail",params,cbSuccess,cbFail);
})

//连接聆听者
export let getConnectState=((params,cbSuccess,cbFail)=>{
  post("/listen/connect",params,cbSuccess,cbFail);
})

//取消通话
export let cancelState=((params,cbSuccess,cbFail)=>{
  post("/listen/cancel",params,cbSuccess,cbFail);
})


//获取测试结果
export let getTestResult=((params,cbSuccess,cbFail)=>{
  post("/test/result",params,cbSuccess,cbFail);
})

//获取测试栏目
export let getTestCategories=((params,cbSuccess,cbFail)=>{
  post("/test/categories",params,cbSuccess,cbFail);
})

//获取心理资讯目录
export let getPsyCategories=((params,cbSuccess,cbFail)=>{
  post("/article/category",params,cbSuccess,cbFail);
})

//获取心理资讯列表
export let getPsyLists=((params,cbSuccess,cbFail)=>{
  post("/article/list",params,cbSuccess,cbFail,psyListsFilter);
})

//获取心理资讯详情
export let getPsyDetail=((params,cbSuccess,cbFail)=>{
  post("/article/detail",params,cbSuccess,cbFail);
})

//随机获取精选文章
export let getRandomArticle=((params,cbSuccess,cbFail)=>{
  post("/article/random",params,cbSuccess,cbFail);
})

//保存答案
export let saveAnswers=((params,cbSuccess,cbFail)=>{
  post("/test/save-answers",params,cbSuccess,cbFail);
})


//-----------------工会相关内容-----------
//心理健康分类
export let getPsyCategory=((params,cbSuccess,cbFail)=>{
  post("/article/category",params,cbSuccess,cbFail,articleChangeName);
})

//心理健康列表
// export let getPsyLists=((params,cbSuccess,cbFail)=>{
//   post("/article/list",params,cbSuccess,cbFail);
// })

//心理健康详情
// export let getPsyDetail=((params,cbSuccess,cbFail)=>{
//   post("/article/detail",params,cbSuccess,cbFail);
// })


//留言咨询--标签--NO
export let getMessageTabs=((params,cbSuccess,cbFail)=>{
  post("/psy/category",params,cbSuccess,cbFail);
})

//留言提交
export let messagePush=((params,cbSuccess,cbFail)=>{
  post("/post/submit",params,cbSuccess,cbFail);
})

//我的留言列表
export let getMyMessageLists=((params,cbSuccess,cbFail)=>{
  post("/post/list",params,cbSuccess,cbFail);
})

//我的留言详情
export let getMessageDetail=((params,cbSuccess,cbFail)=>{
  post("/post/detail",params,cbSuccess,cbFail);
})

//追加留言
export let messageAskMore=((params,cbSuccess,cbFail)=>{
  post("/post/ask-more",params,cbSuccess,cbFail);
})

//删除留言
export let removeMessage=((params,cbSuccess,cbFail)=>{
  post("/post/delete",params,cbSuccess,cbFail);
})

//提交面询预约
export let faceRfPush=((params,cbSuccess,cbFail)=>{
  post("/appointment/create-consult",params,cbSuccess,cbFail);
})

//获取面询预约列表
export let getMyFaceRfLists=((params,cbSuccess,cbFail)=>{
  post("/appointment/list-consult",params,cbSuccess,cbFail);
})

//删除我的面询预约记录
export let removeFaceRf=((params,cbSuccess,cbFail)=>{
  post("/appointment/delete-consult",params,cbSuccess,cbFail);
})


//预约培训
export let addTrainRf=((params,cbSuccess,cbFail)=>{
  post("/appointment/create-train",params,cbSuccess,cbFail);
})


//获取培训列表
export let getTrainRfList=((params,cbSuccess,cbFail)=>{
  post("/appointment/list-train",params,cbSuccess,cbFail);
})

//删除培训
export let deleteTrainRf=((params,cbSuccess,cbFail)=>{
  post("/appointment/delete-train",params,cbSuccess,cbFail);
})


//专家模块
export let docterLists=((params,cbSuccess,cbFail)=>{
  post("/doctor/info",params,cbSuccess,cbFail);
})


//专家模块,自有咨询师列表
export let docterListsSelf=((params,cbSuccess,cbFail)=>{
  post("/doctor/self",params,cbSuccess,cbFail);
})

//专家详情
export let docterDetail=((params,cbSuccess,cbFail)=>{
  post("/doctor/detail",params,cbSuccess,cbFail);
})


//专家模块
export let courseChoice=((params,cbSuccess,cbFail)=>{
  post("/course/choice",params,cbSuccess,cbFail);
})


//心理自助--课程推荐
export let testChoice=((params,cbSuccess,cbFail)=>{
  post("/test/choice",params,cbSuccess,cbFail);
})

//支付接口
export let affirmPay=((params,cbSuccess,cbFail)=>{
  post("/pay/to-pay",params,cbSuccess,cbFail);
})


//课程，下单购买课程接口
export let getCoureseBuyInfo=((params,cbSuccess,cbFail)=>{
  post("/course/buy",params,cbSuccess,cbFail);
})


//测评下单接口
export let testBuy=((params,cbSuccess,cbFail)=>{
  post("/test/buy",params,cbSuccess,cbFail);
})
//用户红包
export let couponMyList=((params,cbSuccess,cbFail)=>{
  post("/coupon/my-list",params,cbSuccess,cbFail);
})
//用户兑换券
export let courseCouponMyList=((params,cbSuccess,cbFail)=>{
  post("/coupon/course-coupon-list",params,cbSuccess,cbFail);
})
//详情页兑换券列表
export let selectCourseCouponList=((params,cbSuccess,cbFail)=>{
  post("/course/select-course-coupon-list",params,cbSuccess,cbFail);
})
//详情页兑换券列表
export let courseOrderCoupon=((params,cbSuccess,cbFail)=>{
  post("/coupon/order",params,cbSuccess,cbFail);
})

//获取微信AppID
export let getAppId=((params,cbSuccess)=>{
  post("/workshop/detail",params,cbSuccess);
})

//获取微信的openId
export let getOpenId=((params,cbSuccess)=>{
  post("/user/getOpenId",params,cbSuccess);
})






