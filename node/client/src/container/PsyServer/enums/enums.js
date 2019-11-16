import {isDev} from "../../../config/config";

let baseUrl=isDev!=="dev"?"https://m.ydl.com":"https://testm.ydl.com";

export default [
  {
    title:"心事问答",
    desc:"QUESTIONS",
    imageName:"a@3x.png",
    url:"/Message"  //类似m站首页
  },
  {
    title:"当面咨询",
    desc:"OFFLINE",
    imageName:"b@3x.png",
    url:"/ExpertSelf"    //只显示公安厅的
  },
  {
    title:"在线预约",
    desc:"ONLINE",
    imageName:"c@3x.png",
    url:`${baseUrl}/experts/search?from=bg`
  },
]
