/**
 * Created by mqd on ${DATE}.
 */
import React, {Component} from 'react';
import {List,Modal} from 'antd-mobile';
import {getAndroidAppUrl,getUserDetail,getMyMessageLists,getMyFaceRfLists,getTrainRfList} from "../../api/api"
import {listsData} from "../../enums/enums"
import {isIOS,loadImage} from "../../utils/common";
import Layout from "../../layout/Layout"

const alert = Modal.alert;
const Item = List.Item;

let config = {
  /*scheme:必须*/
  scheme_IOS: 'ydl_user:///edit',
  scheme_Adr: 'ydl_user:///edit',
  download_url_android:"",
  download_url_ios:"https://itunes.apple.com/cn/app/yi-dian-ling/id1077989161?mt=8",
};

export default class User extends Component {
  state = {
    androidAppUrl: "/",
    alertInfo: "请下载壹点灵APP查看修改",
    hasApp: false,
    userName:"",
    userAvatar:"",
    listsData:listsData
  }
  //修改用户资料
  editInfo=()=>{
    //判断是否安装了APP
    let hasApp = false;
    if (hasApp) {
      //有安装，直接打开APP
      this.setState({
        alertInfo: "请前往壹点灵APP查看修改"
      })
    }
  }
  download=()=>{
    if (this.state.hasApp) {
      //直接打开APP
    }
    else {
      //下载APP
      //没安装，提示下载
      // 判断用户信息
      let url =isIOS() ? config.download_url_ios:this.state.androidAppUrl;
      window.open(url);
    }
  }
  //获取列表数量
  getTotalLists=()=>{
    let {listsData}=this.state;
    let apiLists=[
      {
        api:getMyMessageLists,
        name:"我的问答"
      },
      {
        api:getMyFaceRfLists,
        name:"我的面询预约"
      },
      {
        api:getTrainRfList,
        name:"我的培训预约"
      },
      // {
      //   api:getMyMessageLists,
      //   name:"我的话题"
      // }
    ]
    apiLists.forEach((item,index)=>{
      //我的问答数量
      item.api({},(result)=>{
        listsData.forEach((item2,index2)=>{
            item.name===item2.text && (item2.total=result.totalCount);
        })
        this.setState({
          listsData
        })
      })
    })
  }
  componentDidMount() {
    getUserDetail({},(result)=>{
      let {staffName,head}=result;
        this.setState({
          userAvatar:head,
          userName:staffName
        })
    })
    getAndroidAppUrl(null, (result)=>{
      this.setState({
        androidAppUrl: result
      })
    })
    this.getTotalLists();
  }
  render() {
    let {history} = this.props;
    let {userAvatar,userName,listsData} = this.state;
    let bannerCss = {
      height: "1.76rem",
      backgroundImage: `url(${loadImage("mine_bg@2X.png")})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 1.76rem",
    };
    return (
      <Layout title="个人中心">
        <div className="banner tac df aic w100p" style={bannerCss}>
          <div className="fx1" onClick={() =>
            alert(this.state.alertInfo, '', [
              {text: '取消', onPress: () => console.log('cancel')},
              {text: this.state.hasApp ? "立即下载" : "立即前往", onPress: () => this.download()},
            ])
          }>
            <div className="mb15">
              <img src={userAvatar || loadImage("head_nor@3X.png")} alt="" className="bdrs50p" style={{width: "0.75rem", height: "0.75rem", border: "0.02rem solid white"}}/>
            </div>
            <div className="fz18 white">
              {userName}
            </div>
          </div>
        </div>

        <List>
          {
            listsData.map((item, index) => (
              <Item
                key={index}
                thumb={item.icon}
                arrow="horizontal"
                extra={item.total>0 && <span className={"dib bg-red white bdrs50p fz12 w20 h20 lh20 tac mr20"} style={{padding:"0.01rem"}}>{item.total}</span>}
                onClick={() => {
                  history.push(`${item.targetUrl}?from=/user`)
                }}
              >{item.text}</Item>
            ))
          }
        </List>
      </Layout>
    );
  }
}
