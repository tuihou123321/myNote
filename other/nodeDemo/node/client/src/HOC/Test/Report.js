import React, {Component} from 'react';
import {Toast} from 'antd-mobile';
import { getTestResult } from "../../api/api"
import {getLastParam} from "../../utils/common"
import html2canvas from "html2canvas"
import $ from "jquery"
import cookie from 'cookie'
import { isDev } from "../../config/config"

let apiUrl="https://activity.yidianling.com/api/changeToBase64";

const HOC = (WrappedComponent) =>
  class WrapperComponent extends React.Component {
    static async getInitialProps(ctx) {
      const { req, asPath } = ctx;
      try {
        let result;
        let allCookie;
        let cps_channel_p;
        if (req) {
          allCookie = req.headers.cookie
          cps_channel_p = cookie.parse(String(allCookie)).cps_channel_p
        } else {
          allCookie = document.cookie
          cps_channel_p = cookie.parse(String(allCookie)).cps_channel_p
        }
        let resultId=getLastParam(0,asPath);
        result = await getTestResult({ resultId: resultId });
        return {
          result,
          isCPS: cps_channel_p,
        }
      } catch (err) {
        return { err }
      }
    }
    constructor(props) {
      super(props);
      this.state = {
        desc: "",
        testResult: [],
        resultAnalyse: "",
        name: "",
        modal1: false,
        codeUrl:"",
        shareImageUrl:"",
        bannerBase64:"",   //当默认图片
        sharePic:"",
        shareImageBase46:"",
        resultUrl:"", //外部结果的链接
        testPattern:1,  //1为普通测试，2为table,，5为16pf，6为能力模型
        head120:"" ,  //用户头像
        head120Base64:"" ,  //用户头像
        nickName:"", //用户昵称
        questionId:0,
        Echart16pfBase64:"", //16ps base64图片地址
        ReportEchartRadarBase64:"",
        isScrolling: "yes",
        fromshare: "",
        codeurl: "",
        tagList: [],
        coursesList: [],
        listenersList: [],
        ceshiList: [],
      };
    }
    canvasToImage=()=>{
      //生成分享内容图片
      html2canvas(document.querySelector("#shareContent")).then(canvas=>{
        if(canvas){
          //把canvas转换成 html
          let shareImageBase46 = canvas.toDataURL("image/png");
          this.setState({
            shareImageBase46
          })
        }
      })
    }
    //生成分享图片
    buildImg = () => {
      //双重保障
      let {testPattern,Echart16pfBase64,ReportEchartRadarBase64}=this.state;
      let addH=0;
      if(testPattern===5){
        //获取屏幕宽度
        addH=1185;
      }
      else if(testPattern===6){
        //获取屏幕宽度
        if($(window).width()>400){
          addH=278
        }else{
          addH=240;
        }
      }
      this.setState({
        modal1: true,
        newHeight: $(".boxB").height()+210+addH
      }, () => {
        if(testPattern === 5 || testPattern === 6){
          (testPattern === 5 && !Echart16pfBase64) && this.build16ps(true);
          (testPattern === 6 && !ReportEchartRadarBase64) && this.BuildReportEchartRadarBase64(true);
        }
        else{
          this.canvasToImage();
        }
      })
    }
    BuildReportEchartRadarBase64=(isBuildImg)=>{
      //16ps canvas生成图片
      html2canvas(document.querySelector("#result_chart3")).then(canvas=>{
        if(canvas){
          //把canvas转换成 html
          let ReportEchartRadarBase64 = canvas.toDataURL("image/png");
          this.setState({
            ReportEchartRadarBase64
          },()=>{
            //二次生成图片保险
            isBuildImg && this.canvasToImage();
          })
        }
      })
    }
    build16ps=(isBuildImg)=>{
      //16ps canvas生成图片
      html2canvas(document.querySelector("#result_chart2")).then(canvas=>{
        if(canvas){
          //把canvas转换成 html
          let Echart16pfBase64 = canvas.toDataURL("image/png");
          this.setState({
            Echart16pfBase64
          },()=>{
            //二次生成图片保险
            isBuildImg && this.canvasToImage();
          })
        }
      })
    }
    getData=()=> {
      let resultId = getLastParam();
      Toast.loading("加载中...", 0);
      getTestResult({resultId: resultId},(result)=>{
        let { testResult, desc, resultAnalyse, name,title, resultUrl, sharePic, cover,testPattern, head120, nickName, testItemsId } = result;
        //生产环境才替换
        if(isDev==="pro"){
          resultUrl=resultUrl.replace("http:","https:");
        }
        this.setState({
          testResult,
          desc,
          resultAnalyse,
          name:title,
          resultUrl,
          testPattern,
          sharePic:cover || "https://img.ydlcdn.com/file/2018/12/05/d33qy3jladlyzhnd.jpg",
          head120,
          nickName,
          testItemsId,
        }, () => {
          Toast.hide();
          resultUrl && setTimeout(()=>{this.setState({isScrolling:"yes"})},100)
          //异步处理提高性能
          // this.changeUrlImageToBase64(sharePic,head120);
        })
      })

    }
    closeModel=()=>{
      this.setState({modal1: false})
    }
    componentDidMount() {
      this.getData();
    }
    render() {
      let { closeModel, buildImg, goBackButton } = this;
      if(!this.state.name){
          this.state=Object.assign(this.state,this.props.result)
      }
      //只展示，不用交互
      if(this.state.tagList.length===0){
        this.state.coursesList=this.props.coursesList || [];
        this.state.tagList=this.props.tagList || [];
        this.state.listenersList=this.props.listenersList || [];
        this.state.ceshiList=this.props.ceshiList || [];
      }

      //如果state有值，就不覆盖了；
      return <WrappedComponent  {...this.state}   goBackButton={goBackButton} closeModel={closeModel} buildImg={buildImg}/>;    }
  }

export default HOC;
