import {loadImage} from "../../../../../utils/common";

export let listsData = [
  {
    icon: loadImage("icon_talk@3X.png"),
    text: "倾诉记录",
    targetUrl: "/user/Listen"
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

    icon: loadImage("icon_wallet@3X.png"),
    text: "企业余额",
    targetUrl: "/user/Balance"
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
    url:`/`
  },
  {
    title:"找专家",
    url:`/experts/category`
  },
  {
    title:"电话倾诉",
    url:`/listen`
  },
  {
    title:"心理课程",
    url:`/course`
  }, {
    title:"在线问答",
    url:`/ask`
  },{
    title:"心理测试",
    url:`/ceshi`
  },
  {
    title:"文章",
    url:`/jingyan`
  },
  {
    title:"案例",
    url:`/case`
  }
]

export let navLists2=[
  {
    title:"专家入驻",
    url:`/enter`
  },
  {
    title:"关于我们",
    url:`/about`
  },
  {
    title:"帮助中心",
    url:`/help`
  },
  {
    title:"意见反馈",
    url:`//m2.ydl.com/opion/opion`
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

export let echart16pfEnums=[
  {key:'A',
    name:['缄默孤独', '乐群外向']},
  {key:'B',
    name:['迟钝浅薄', '聪慧博学']},
  {key:'C',
    name:['情绪激动', '情绪稳定']},
  {key:'E',
    name:['谦虚顺从', '好强固执']},
  {key:'F',
    name:['严肃审慎', '轻松兴奋']},
  {key:'G',
    name:['权宜敷衍', '有恒负责']},
  {key:'H',
    name:['畏缩退怯', '冒险敢为']},
  {key:'I',
    name:['理智实际', '感情用事']},
  {key:'L',
    name:['信赖随和', '怀疑刚愎']},
  {key:'M',
    name:['现实守规', '幻想狂放']},
  {key:'N',
    name:['直率天真', '精明世故']},
  {key:'O',
    name:['沉着自信', '忧虑抑郁']},
  {key:'Q1',
    name:['保守传统', '自由激进']},
  {key:'Q2',
    name:['依赖附和', '自主果决']},
  {key:'Q3',
    name:['矛盾冲突', '自律严谨']},
  {key:'Q4',
    name:['心平气和', '紧张困扰']},
]

//这个数据从前端获取， 不是对比
export let tableTitle16pf=[
  {
    name: 'A乐群性',
    key: 'A'
  },
  {
    name: 'B智慧性',
    key: 'B'
  },
  {
    name: 'C稳定性',
    key: 'C'
  },
  {
    name: 'E恃强性',
    key: 'E'
  },
  {
    name: 'F兴奋性',
    key: 'F'
  },
  {
    name: 'G有恒性',
    key: 'G'
  },
  {
    name: 'H敢为性',
    key: 'H'
  },
  {
    name: 'I敏感性',
    key: 'I'
  },
  {
    name: 'L怀疑性',
    key: 'L'
  },
  {
    name: 'M幻想性',
    key: 'M'
  },
  {
    name: 'N世故性',
    key: 'N'
  },
  {
    name: 'O忧虑性',
    key: 'O'
  },
  {
    name: 'Q1实验性',
    key: 'Q1'
  },
  {
    name: 'Q2独立性',
    key: 'Q2'
  },
  {
    name: 'Q3自律性',
    key: 'Q3'
  },
  {
    name: 'Q4紧张性',
    key: 'Q4'
  },
]
