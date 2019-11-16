// import AsyncComponent from '../components/AsyncComponent/AsyncComponent'

// const NotFound = AsyncComponent(() => import("../container/NotFound/NotFound"))
// const Index = AsyncComponent(() => import("../container/Index/Index"))
// const Login = AsyncComponent(() => import("../container/Login/Login"))
// const Reset =AsyncComponent(() => import( "../container/Reset/Reset"))
// const User =AsyncComponent(() => import( "../container/User/User"))
// const UserBalance = AsyncComponent(() => import( "../container/User/UserBalance"))
// const UserConfide = AsyncComponent(() => import( "../container/User/UserConfide"))
// const UserCourse = AsyncComponent(() => import( "../container/User/UserCourse"))
// const UserTest = AsyncComponent(() => import( "../container/User/UserTest"))
// const Help = AsyncComponent(() => import( "../container/Help/Help"))
// const HelpDetail = AsyncComponent(() => import( "../container/Help/Detail"))
// const Course = AsyncComponent(() => import( "../container/Course/Course"))
// const CourseDetail = AsyncComponent(() => import( "../container/Course/Detail"))
// const CoursePlay = AsyncComponent(() => import( "../container/Course/Play"))
// const Confide = AsyncComponent(() => import( "../container/Confide/Confide"))
// const ConfideDetail = AsyncComponent(() => import( "../container/Confide/Detail"))
// const ConfideCalling = AsyncComponent(() => import( "../container/Confide/Calling"))
// const Test = AsyncComponent(() => import( "../container/Test/Test"))
// const TestStart = AsyncComponent(() => import( "../container/Test/Start"))
// const Testing = AsyncComponent(() => import( "../container/Test/Testing"))
// const PsyList = AsyncComponent(() => import( "../container/Psy/PsyList"))
// const PsyDetail = AsyncComponent(() => import( "../container/Psy/Detail"))
// const Report = AsyncComponent(() => import( "../container/Test/Report"))
// const Books = AsyncComponent(() => import( "../container/Books/Books"))
// const Movies = AsyncComponent(() => import( "../container/Movies/Movies"))
// const PsyServer = AsyncComponent(() => import( "../container/PsyServer/PsyServer"));
// const Expert = AsyncComponent(() => import( "../container/PsyServer/Expert"))
// const ExpertSelf = AsyncComponent(() => import( "../container/PsyServer/ExpertSelf"))
// const Message = AsyncComponent(() => import( "../container/Message/Message"))
// const Record = AsyncComponent(() => import( "../container/Message/Record"))
// const MessageDetail = AsyncComponent(() => import( "../container/Message/Detail"))
// const FaceRf = AsyncComponent(() => import( "../container/FaceRf/FaceRf"))
// const FaceRfRecord = AsyncComponent(() => import( "../container/FaceRf/Record"))
// const TrainRf = AsyncComponent(() => import( "../container/TrainRf/TrainRf"))
// const TrainRfRecord = AsyncComponent(() => import( "../container/TrainRf/Record"))
// const PayState = AsyncComponent(() => import( "../container/Pay/PayState"))
// const Pay = AsyncComponent(() => import( "../container/Pay/Pay"))
// const mHome = AsyncComponent(() => import(`../container/mHome/mHome`))
// const Sos = AsyncComponent(() => import(`../container/Sos/Sos`))

import NotFound from "../container/NotFound/NotFound"
import Index from "../container/Index/Index"
import Login from "../container/Login/Login"
import Reset from "../container/Reset/Reset"
import User from "../container/User/User"
import UserBalance from  "../container/User/UserBalance"
import UserRedEnvelope from  "../container/User/UserRedEnvelope"
import UserConfide from  "../container/User/UserConfide"
import UserCourse from  "../container/User/UserCourse"
import UserTest from  "../container/User/UserTest"
import Help from  "../container/Help/Help"
import HelpDetail from  "../container/Help/Detail"
import Course from  "../container/Course/Course"
import CourseDetail from  "../container/Course/Detail"
import CoursePlay from  "../container/Course/Play"
import Confide from  "../container/Confide/Confide"
import ConfideDetail from  "../container/Confide/Detail"
import ConfideCalling from  "../container/Confide/Calling"
import Test from  "../container/Test/Test"
import TestStart from  "../container/Test/Start"
import Testing from  "../container/Test/Testing"
import PsyList from  "../container/Psy/PsyList"
import PsyDetail from  "../container/Psy/Detail"
import Report from  "../container/Test/Report"
import Books from  "../container/Books/Books"
import Movies from  "../container/Movies/Movies"
import PsyServer from  "../container/PsyServer/PsyServer";
import Expert from  "../container/PsyServer/Expert"
import ExpertSelf from  "../container/PsyServer/ExpertSelf"
import Message from  "../container/Message/Message"
import Record from  "../container/Message/Record"
import MessageDetail from  "../container/Message/Detail"
import FaceRf from  "../container/FaceRf/FaceRf"
import FaceRfRecord from  "../container/FaceRf/Record"
import TrainRf from  "../container/TrainRf/TrainRf"
import TrainRfRecord from  "../container/TrainRf/Record"
import PayState from  "../container/Pay/PayState"
import Pay from  "../container/Pay/Pay"
import mHome from "../container/mHome/mHome"
import PsyMember from "../container/PsyMember/PsyMember"
import Sos from "../container/Sos/Sos"


let RouterLists=[
      {
        title:"首页",
        url:"/",
        component:Index,
        child:[]
      },{
      title:"登录",
      url:"/login",
      component:Login,
      child:[]
    },
    {
      title:"重置密码",
      url:"/Reset",
      component:Reset,
      child:[]
    },
    {
      title:"个人中心",
      url:"/User",
      component:User,
      child:[
        {
          title:"我的余额",
          url:"/User/Balance",
          component:UserBalance
        },
        {
          title:"红包",
          url:"/User/UserRedEnvelope",
          component:UserRedEnvelope
        },
        {
          title:"倾诉记录",
          url:"/User/Confide",
          component:UserConfide
        },
        {
          title:"我的课程",
          url:"/User/CourseLists",
          component:UserCourse
        },
        {
          title:"我的测试",
          url:"/User/Test",
          component:UserTest
        },
      ]
    },
    {
      title:"帮助中心",
      url:"/Help",
      component:Help,
      child:[
        {
          title:"帮助详情",
          url:"/Help/Detail/:id",
          component:HelpDetail
        }
      ]
    },
    {
      title:"课程",
      url:"/Course",
      component:Course,
      child:[
        {
          title:"课程详情",
          url:"/Course/Detail/:id",
          component:CourseDetail
        },
        {
          title:"播放课程",
          url:"/Course/Play/:id/:activeIndex",
          component:CoursePlay
        },
        {
          title:"试听课程",
          url:"/Course/PlayDemo/:id/:activeIndex",
          component:CoursePlay
        }
      ]
    },
    {
      title:"书籍",
      url:"/Books",
      component:Books,
      child:[
        {
          title:"心理书籍",
          url:"/Books/Detail/:id",
          component:CourseDetail
        }
      ]
    },
    {
      title:"电影",
      url:"/Movies",
      component:Movies,
      child:[
        {
          title:"心理电影",
          url:"/Movies/Detail/:id",
          component:CourseDetail
        }
      ]
    },
    {
      title:"倾诉",
      url:"/Confide",
      component:Confide,
      child:[
        {
          title:"倾诉详情",
          url:"/Confide/Detail/:id",
          component:ConfideDetail
        },
        {
          title:"倾诉通话",
          url:"/Confide/Calling/:id",
          component:ConfideCalling
        }
      ]
    },{
      title:"测试中心",
      url:"/Ceshi",
      component:Test,
      child:[
        {
          title:"准备开始测试",
          url:"/Ceshi/Start/:id",
          component:TestStart
    },
    {
          title:"测试页面",
          url:"/Ceshi/Testing/:id",
          component:Testing
        },
        {
          title:"测试页面",
          url:"/Ceshi/Report/:id",
          component:Report
        }
      ]
    },
    {
      title:"心理资讯",
      url:"/Psy",
      component:PsyList,
      child:[
        {
        title:"心理资讯详情",
        url:"/Psy/detail/:id",
        component:PsyDetail
      }
      ]
    },
    {
      title:"心理自助",
      url:"/mHome",
      component:mHome,
      child:[
      ]
    },
    {
      title:"心理服务",
      url:"/PsyServer",
      component:PsyServer,
      child:[
        {
          title:"专家团队",
          url:"/Expert",
          component:Expert
        },
        {
          title:"心理专家",
          url:"/ExpertSelf",
          component:ExpertSelf
        },
        {
          title:"专家详情",
          url:"/Expert/Detail/:id",
          component:ConfideDetail
        }
      ]
    },
    {
      title:"心事留言",
      url:"/Message",
      component:Message,
      child:[
       {
          title:"留言记录",
          url:"/Message/Record",
          component:Record,
        },{
          title:"留言详情",
          url:"/Message/Detail/:id",
          component:MessageDetail,
        },
      ]
    },
    {
      title:"面询预约",
      url:"/FaceRf",
      component:FaceRf,
      child:[
        {
          title:"我的面询记录",
          url:"/FaceRf/Record",
          component:FaceRfRecord,
        }
      ]
    },
    {
      title:"培训预约",
      url:"/TrainRf",
      component:TrainRf,
      child:[
        {
          title:"我的培训预约",
          url:"/TrainRf/Record",
          component:TrainRfRecord,
        }
      ]
    },
    {
      title:"支付进度",
      url:"/PayState",
      component:PayState,
      child:[]
    },
    {
      title:"充值",
      url:"/Pay/:id",
      component:Pay,
      child:[]
    },
  {
    title:"危机化解",
    url:"/Sos",
    component:Sos,
    child:[]
  },
  {
    title:"心理委员",
    url:"/psyMember",
    component:PsyMember,
    child:[]
  },
    {
      title:"404",
      url:"/404",
      component:NotFound,
      child:[]
    }
  ]

export default RouterLists


