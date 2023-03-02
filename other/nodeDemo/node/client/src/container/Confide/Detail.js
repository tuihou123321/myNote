/**
 * Created by mqd on ${DATE}.
 */
import React, { Component, Fragment } from 'react';
import {getConfideDetail, docterDetail} from "../../api/api"
import {tagsLimit} from "../../utils/common";
import {Toast} from "antd-mobile"
import BannerOpacity from "../../components/Banner/BannerOpacity"
import classNames from "classname"
import Layout from "../../layout/Layout";
import ConfideBuyModal from "../../components/BuyModal/ConfideBuyModal"


export default class ConfideDetail extends Component {
  state = {
    head:"",
    name:"",
    tags:"",
    listenNums:"",
    feedbackRate:"",
    desc:"",
    listenFee:"",
    scheduleIsOneline:"",
    handIsOnline:"",
    status:"",
    teacherId:"",   //老师id
    trainingBackground:"",
    goodAt:"",
    modal1:false,
    companyManager:"",
    MustMoney:0,  //差额
  }
  calling(){
    this.refs.ConfideBuyModal.buy()
  }
  onClose = key => () => {
    this.setState({
      modal1: false,
    });
  }
  //获取专家详情
  getExpertInfo=(getConfideDetailFun)=>{
    let teacherId=this.props.match.params.id;
    getConfideDetailFun({id:teacherId}, (result)=>{
      let {name,head,tags,tag2,listenNums,feedbackRate,desc,listenFee,scheduleIsOneline,handIsOnline,status,trainingBackground,goodAt}=result;
      //传递给 通话中页面使用，做为老师头像；
      head && sessionStorage.setItem("teacherImg",head);
      //对tags进行字段截取,最多显示,加上,最大展示20个字
      if(tag2){
          tags=tag2;
      }
      tags=tagsLimit(tags,20);
      this.setState({
        head,
        name,
        tags,
        listenNums,
        feedbackRate,
        desc,
        listenFee,
        scheduleIsOneline,
        handIsOnline,
        status,
        trainingBackground,
        goodAt,
        teacherId:teacherId,
        expertStateShow:window.location.href.indexOf("confide/detail")>-1
      },()=>{
        Toast.hide();
      })
    });
  }
  componentDidMount() {
    Toast.loading("加载中...",0)
    if(window.location.href.indexOf("Expert")>0){
      this.getExpertInfo(docterDetail);
    }else{
      this.getExpertInfo(getConfideDetail);
    }
  }
  render() {
    let {head, name, tags,listenNums,feedbackRate, desc, listenFee,scheduleIsOneline,handIsOnline,status,trainingBackground,goodAt,MustMoney,expertStateShow}=this.state;
    // scheduleIsOneline=1;
    // status=1
    let PriceDetail=(
      <Fragment>
        <div className={"p20 pl15 pr15"}>
          <h1 className={"fz18 mb10"}>{desc}</h1>
          <div className={"c9 fz12 rel"}>
            <div>
              <div>
                <span className={"orange b"}>¥<em className={"fz30"}>{listenFee}</em>.00 </span>
                /次(25分钟)
              </div>
              <div className={"abs r0 b5"}>
                      <span className={"mr20"}>
                        已聆听  <em className={"orange b"}>{listenNums}次</em>
                      </span>
                <span>
                        好评率  <em className={"orange b"}>{feedbackRate}%</em>
                      </span>
              </div>
            </div>
          </div>
        </div>
        <div className="blank"/>
      </Fragment>
    )
    let title=expertStateShow ? "倾诉热线" : "专家详情";
    return (
      <Layout title={title} bg={"true"} url={this.props.url}>
        <BannerOpacity head={head}>
          <div className={"abs b0 p20"}>
            <h1 className={"fz25 mb10 white"}>{name}</h1>
            {
              tags && tags.length>0 && tags.map((item,index)=>(
                <span className={"tag"} key={index}>{item}</span>
              ))
            }
          </div>
        </BannerOpacity>
        {
          expertStateShow && PriceDetail
        }
          <div className={"p15 pt20 pb20"}>
            <h1 className={"fz18 mb20"}>专家简介</h1>
            <div className={"fz14"}>
              {
                trainingBackground &&  <div className={"mb20"}>
                  <h4>培训经历:</h4>
                  {trainingBackground}
                </div>
              }

              {
                goodAt && <div>
                  <h4>擅长领域</h4>
                  {goodAt}
                </div>
              }
              </div>
          </div>
        <div className={classNames({"vh":!expertStateShow})}>
          {
            (()=>{
              //scheduleIsOneline,handIsOnline都为1时为在线
              if((scheduleIsOneline!==1 || handIsOnline!==1) && status!==2){
                return    <div className={"w100p tac h45 lh45 fz16 fix b0 bg-grey c6"}>
                  已离线
                </div>
              }
              else{
                //通话中 status===1空闲
                if(status===1){
                  return    <div className={"w100p tac h45 lh45 fz16 fix b0 bg-blue white"} onClick={()=>this.calling()}>
            立即链接
          </div>
                }
                else{
                  return    <div className={"w100p tac h45 lh45 fz16 fix b0 bg-orange white"}>
                    正在通话中...
                  </div>
                }
              }
            })()
          }
        </div>
        <ConfideBuyModal
          applyFee={this.state.listenFee}
          ref={"ConfideBuyModal"}
        />
        </Layout>
    );
  }
}
