/**
 * Created by mqd on ${DATE}.
 */
import React, { Component, Fragment } from 'react';
import Layout from "../../layout/Layout"
import { Tabs, Icon,Toast, Modal, Button } from 'antd-mobile';
import CourseDetailLists from "../../components/CourseDetailLists/CourseDetailLists"
import DetailTeacher from "./component/DetailTeacher"
import FooterButton from "./component/FooterButton"
import CourseUseCode from './component/CourseUseCode'
import Tips from "./component/Tips"
import Popup from "../../components/Popup/Popup"
import $ from "jquery"
import {getCourseDetail, getUserDetail, getCourseBuy, getCoureseBuyInfo} from "../../api/api"
import {loadImage} from "../../utils/common";
import {getLastParam} from "../../static/js/common"
import {priceFun,priceFun2,isCourseName} from "./common/Detail"
import { affirmPay } from "../../static/js/public"
import { payLoadType } from "../../components/Popup/enums/enums"
import './component/css/CourseUseCode.css'
let courseDetail = require("../../api/json/course/detail");


export default class CourseDetail extends Component {
  state = {
    listsData:[],
    showPopup:false,
    title:"",
    pic:"",
    desc:"",
    content:"",
    applyFee:"",
    originalApplyFee:"",
    readNums:"",
    courseType:"",
    demoOption:2,  //是否试听,1是2否
    hostInfo:{},  //主讲人
    subCourseList:[],  //当前课程目录列表
    Balance:0,
    id:"",
    isBuy:false,
    demoAttachmentList:[], //试听附件列表
    page:1,
    pageSize:10,
    payTypeId:payLoadType[0].id
  }
  componentDidMount() {
    this.getCompanyBalance();
    let id=this.props.match.params.id;
    Toast.loading("加载中",0)
    getCourseDetail({id:id},(result)=>{
      // result=courseDetail.data;
      let {title, pic, desc, content, applyFee, originalApplyFee, readNums, courseType, demoOption, hostInfo, subCourseList,isBuy,demoAttachmentList}=result;
      this.setState({
        title,
        pic,
        desc,
        content,
        applyFee,
        originalApplyFee,
        readNums,
        courseType,  //6代表系列课程，显示目录字段
        demoOption,
        hostInfo,
        subCourseList,
        id,
        isBuy,
        demoAttachmentList,
      })
      Toast.hide();
    })
  }
  getMoreLists(){
  }
  getCompanyBalance(){
    getUserDetail(null,(result)=>{
      let {companyMoney}=result;
      if(companyMoney){
        this.setState({
          Balance:companyMoney
        })
      }
    });
  }
  startScroll(index){
    if(index===2){
      let mTop=$("#tags").offset().top-40;
      $( "html,body").animate({ "scrollTop" : mTop }, 300);
    }
  }
  renderContent = item =>{
    return null;
  }
  hideModal = () => {
    this.setState({
      showPopup: false,
    });
  }
  //使用余额支付
  payForBalance=()=>{
    getCourseBuy({id:this.state.id},(result)=>{
      Toast.success("购买成功");
      //购买成功
      this.setState({
        showPopup:false,
        isBuy:true
      })
    })
  }
  payForBuy=()=>{
    let {payTypeId}=this.state;
    this.getPayId(payTypeId)
  }
  //获取payId
  getPayId=(payTypeId)=>{
    Toast.loading("加载中",0);
    let id=getLastParam();
    getCoureseBuyInfo({
      id
    },(result)=>{
      Toast.hide();
      if(result.payId){
        affirmPay(result.payId,payTypeId);
      }else{
        Toast.fail("无效的payId");
      }
    })
  }
  //购买系统课程
  buy=()=>{
    //如果钱不够，就去支付
    let {Balance,applyFee}=this.state;
    // //余额不足情况
    Balance<applyFee ? this.payForBuy() : this.payForBalance();
  }
  showPopupFun=()=>{
    let { Balance, applyFee }=this.state;
    //判断金额是否足够
    if(Balance<applyFee){
      this.setState({
        isShowNoEnough:true
       })
    }else{
      this.setState({
        showPopup: true,
      });
    }
  }
  changePayType=(payTypeId)=>{
      this.setState({
        payTypeId
       })
  }
  render() {
    let { history } = this.props;
    let { subCourseList,title, pic,  content, applyFee, originalApplyFee, readNums, courseType, demoOption, hostInfo, Balance,id,isBuy,page,pageSize,showPopup,payTypeId}=this.state;
    let {showPopupFun,buy,hideModal,changePayType}=this;
    let tabs=[{id:1, title:"课程介绍"}, {id:2, title:"课程目录"}];
    courseType!==6 && (tabs=[tabs[0]])
    let lists=subCourseList.slice(0,page*pageSize);
    let CurrentId=id;
    if(courseType===6 && subCourseList.length>0){
      id=subCourseList[0].id;
    }
    let subLength=1; //单课程默认一条数据
    if(courseType===6){
      subLength=subCourseList.length;
    }
    let BannerDesc=(
      <div className={"p20 pl15 pr15"}>
        <h1 className={"fz18 mb10"}>{title}</h1>
        <div className={"c9 fz12 rel"}>
          <div>
            <div className={"orange b mr10 dib"}>¥{priceFun(applyFee)}</div>
            <del>{priceFun2(originalApplyFee)}</del>
          </div>
          <div className={"abs r0 b5"}>
            <span className={"mr20"}><em className={"orange b"}>{subLength}节</em>{isCourseName(courseType)}</span>
            <span>人气<em className={"orange b"}>{readNums}</em></span>
          </div>
        </div>
      </div>
    )

    let isShowCoupon = () => {
      // if (isCoupon) {
        return  <div><CourseUseCode />
        <div className="blank"></div></div>
      // }
      // return <div></div>
    }
    return (
      <Layout title={title}  FooterBottom={<div className={"h50"}/>}>
        <div className={"opcity-white"}/>
        <img src={pic} alt="" className={"w100p"} style={{maxHeight:"2.5rem"}}/>
         {BannerDesc}
        <div className="blank"/>
        {!isBuy && isShowCoupon()}
        <div className={"plr50"}>
          <Tabs tabs={tabs} onTabClick={(item)=>{this.startScroll(item.id)}}>{this.renderContent}</Tabs>
        </div>

        <div className={"p15 ptb30 imgWidthMin"}>
          <div dangerouslySetInnerHTML={{ __html: content}}/>
        </div>
          {
            subCourseList.length>0 &&  (
              <Fragment>
                <div className="blank"/>
                <div className={"p15 pt30"} id={"tags"}>
                    <h1 className={"fz18"}>课程目录</h1>
                    <div>
                      {/*{CourseDetailLists()}*/}
                      <CourseDetailLists {...{lists,isBuy,history,showPopupFun}}/>
                      {
                        subCourseList.length>(page*pageSize) && <div className={"df jcc aic blue"} onClick={()=>{this.setState({page:this.state.page+1})}}>
                          <span>展开更多</span>
                          <span><Icon type={"down"} size={"xxs"}/></span>
                        </div>
                      }
                    </div>
                </div>
              </Fragment>
            )
          }
          <div className="blank"/>
          {DetailTeacher(hostInfo)}
          <Tips/>
          {FooterButton(isBuy,demoOption,CurrentId,id,showPopupFun,history)}
          <Popup {...{showPopup, Balance, applyFee,payTypeId,buy,hideModal,changePayType}}/>
          <Modal
            transparent
            closable={true}
            visible={this.state.isShowNoEnough}
            onClose={()=>this.setState({isShowNoEnough:false})}
            animationType="slide-up"
          >
             <div className={"tac"}>
               <img src={loadImage("ico_pop_yebz@2x.png")} alt="" className={"w50 mb5"}/>
               <h3 className={"n pb10 fz15 c2"}>余额不足</h3>
               <div className={"mb25 c9 fz11"}>
                 <p>该课程需补充余额{(applyFee-Balance).toFixed(2)}元</p>
                 <p>请立即支付或联系管理员申请充值</p>
               </div>
               <div className={"df"}>
                 <Button type={"ghost"} className={"fx1 fz14"} onClick={()=>this.setState({showContact:true,isShowNoEnough:false})}>联系管理员</Button>
                 <div className={"w10"}/>
                 <Button type={"primary"} className={"fx1 fz14"} onClick={()=>{
                   this.setState({
                     isShowNoEnough:false,
                     showPopup:true
                   })
                 }}>立即支付</Button>
               </div>
             </div>
          </Modal>

          <Modal
            transparent
            visible={this.state.showContact}
            onClose={()=>this.setState({showContact:false})}
            animationType="slide-up"
            className={"contactWXWrap"}
          >
            <a href={"javascript:void(0)"} className={"abs t15 r5 c6 p5 bg-white"} onClick={()=>this.setState({showContact:false})}>
              <Icon type={"cross"}/>
            </a>
            <img src={loadImage("img_pop_ewm@2x.png")} alt="" className={"w250"}/>
          </Modal>
       </Layout>
    );
  }
}
