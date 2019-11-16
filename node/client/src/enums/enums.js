import { loadImage } from "../utils/common";

export let listsData = [
  {
    icon: loadImage("icon_talk@3X.png"),
    text: "倾诉记录",
    targetUrl: "/user/Confide"
  },
  {
    icon: loadImage("icon_course@3X.png"),
    text: "我的课程",
    targetUrl: "/user/CourseLists"
  },
  {
    icon: loadImage("icon_test@3X.png"),
    text: "我的测试",
    targetUrl: "/user/Test"
  },
  {
    icon: loadImage("ico_wdwd@3x.png"),
    text: "我的问答",
    targetUrl: "/Message/Record",
    total:0
  },
  {
    icon: loadImage("ico_wdmxyy@3x.png"),
    text: "我的面询预约",
    targetUrl: "/FaceRf/Record",
    total:0
  },
  {
    icon: loadImage("ico_wdpxyy@3x.png"),
    text: "我的培训预约",
    targetUrl: "/TrainRf/Record",
    total:0
  },
  // {
  //   icon: loadImage("ico_wdht@3x.png"),
  //   text: "我的话题",
  //   targetUrl: "/user/topic",
  //   total:0
  // },
  // {
  //   icon: loadImage("ico_fxgpy@3x.png"),
  //   text: "复制分享给朋友",
  //   targetUrl: ""
  // },
  {

    icon: loadImage("icon_wallet@3X.png"),
    text: "账户余额",
    targetUrl: "/user/Balance"
  },
  {

    icon: loadImage("icon_wallet@3X.png"),
    text: "红包",
    targetUrl: "/user/UserRedEnvelope"
  },
  {

    icon: loadImage("icon_help@3X.png"),
    text: "帮助",
    targetUrl: "/help"
  }
]

export let navLists=[
  {
    title:"首页",
    url:"/"
  },
  {
    title:"电话倾诉",
    url:"/confide"
  },
  {
    title:"心理课程",
    url:"/course"
  },{
    title:"心理测试",
   url:"/ceshi"
  },
  {
    title:"心理资讯",
    url:"/psy"
  },
  // {
  //   title:"心理书籍",
  //   url:"/books"
  // },
  // {
  //   title:"心理电影",
  //   url:"/movie"
  // },
  {
    title:"个人中心",
    url:"/user"
  }
]

export let navListsB=[
  {
    title:"首页",
    url:"/"
  },
  {
    title:"电话倾诉",
    url:"/confide"
  },
  {
    title:"心理课程",
    url:"/course"
  },{
    title:"心理测试",
   url:"/ceshi"
  },
  {
    title:"个人中心",
    url:"/user"
  }
]

export let courseTypeArr=[
  {
    id:1,
    name:"线上音频课程"
  },
  {
    id:2,
    name:"线下"
  },{
    id:3,
    name:"app群直播"
  },
  {
    id:4,
    name:"app音视频直播"
  },
  {
    id:5,
    name:"站外课程"
  },{
    id:6,
    name:"系列课程"
  },{
    id:7,
    name:"线上视频课程"
  }
]

export let labels=[
  {
    id:1,
    name:"恋爱婚姻"
  },{
    id:2,
    name:"情绪压力"
  },{
    id:3,
    name:"个人成长"
  },{
    id:4,
    name:"家庭关系"
  },{
    id:5,
    name:"人际关系"
  },{
    id:6,
    name:"子女教育"
  },{
    id:7,
    name:"职业发展"
  },{
    id:8,
    name:"其他"
  },
  {
    id:null,
    name:""
  },
]
//需要展示首页的地址
export let showFooterNav=["/","/mHome","/PsyServer","/user"];
