/**
 * Created by mqd on ${DATE}.
 */
import React, { Component, Fragment } from 'react';
import Layout from "../../layout/Layout"
import { Tabs, Icon,Toast, Modal, Button } from 'antd-mobile';
import CourseDetailLists from "../../components/CourseDetailLists/CourseDetailLists"
import DetailTeacher from "./component/DetailTeacher"
import FooterButton from "./component/FooterButton"
import Tips from "./component/Tips"
import $ from "jquery"
import {getCourseDetail, getUserDetail, getCourseBuy, getCoureseBuyInfo} from "../../api/api"
import {priceFun,priceFun2,isCourseName} from "./common/Detail"
import { affirmPay } from "../../static/js/public"
import { payLoadType } from "../../components/Popup/enums/enums"
import BuyModal from "../../components/BuyModal/BuyModal"

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
  buySuccessFun=()=>{
      this.setState({
        isBuy:true
       })
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
  //购买系统课程
  buy=()=>{
    this.refs.BuyModal.buy();
  }
  componentDidMount() {
    let id=this.props.match.params.id;
    getCourseDetail({id:id},(result)=>{
      // result=courseDetail.data;
      let {title, pic, desc, content, applyFee, originalApplyFee, readNums, courseType, demoOption, hostInfo, subCourseList,isBuy,demoAttachmentList}=result;
      isBuy=false;
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
    })
  }
  render() {
    let { history } = this.props;
    let { subCourseList,title, pic,  content, applyFee, originalApplyFee, readNums, courseType, demoOption, hostInfo, Balance,id,isBuy,page,pageSize,showPopup,payTypeId}=this.state;
    let {showPopupFun,buy}=this;
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

    return (
      <Layout title={title} url={"/course"} FooterBottom={<div className={"h50"}/>}>
        <div className={"opcity-white"}/>
        <img src={pic} alt="" className={"w100p"} style={{maxHeight:"1.65rem"}}/>
         {BannerDesc}
        <div className="blank"/>

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
          {FooterButton(isBuy,demoOption,CurrentId,id,buy,history)}
          <BuyModal
            payApi={getCourseBuy}
            getPayIdApi={getCoureseBuyInfo}
            applyFee={this.state.applyFee}
            buySuccessFun={this.buySuccessFun}
            ref={"BuyModal"}
          />
       </Layout>
    );
  }
}
