/**
 * Created by mqd on ${DATE}.
 */
import React, {Component} from 'react';
import {Toast,Modal} from 'antd-mobile';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {getCoursePlay,getCourseDetail} from "../../api/api"
import {getLastParam} from "../../utils/common";
import history from "../../utils/history";
import classNames from "classname"
import PlayVoiceBox from "../../components/Playing/PlayVoiceBox";

//只在本地测试时用
// import {attachmentList,courseType} from "../../static/js/testData"

let timer=true;
export default class CoursePlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listsDate:[],
      courseType:1,  //1音频 ，7视频,6系统课程
      activeIndex:0,
      isPlaying:false,
      currentTime:0,
      totalTime:0,
      bufferedTime:0,
      currentUrl:"",
      isShowModal:false,
      startTime:0, //是否异常处理，当在微信中播放时间不超过5s时
    };
  }
  //拖动完成重新开始定时器
  onAfterChange=(value)=>{
      let audioPlay=document.getElementById("audioPlay");
      audioPlay.currentTime=value;
      audioPlay.play();
    //如果缓存时间小于拖动时间
    this.setState({
      currentTime:value
    },()=>{
      this.start();
    })
  }
  //是否超过缓存,value动态播放时候loading，拖动放手后loading
  isOverBuffered(value){
  }
  //当在拖动时停止定时器
  onChange=(value)=>{
    this.setState({
      currentTime:value
    })
    this.stop();
  }
  start=()=>{
    //重置音频的播放时间
    let audioPlay=document.getElementById("audioPlay");
    audioPlay.play();
  }
  stop=()=>{
    //当开始拖动的时候暂时播放
    let audioPlay=document.getElementById("audioPlay");
    audioPlay.pause();
  }
  //只执行一次
  changeData=(listsDate,courseType)=>{
    if(listsDate.length>0){
      courseType= listsDate[this.state.activeIndex].courseType
      listsDate[0].isPlaying=true;
      this.setState({
        listsDate,
        courseType
      },()=>{
        //只有在视频时才出现
        Toast.hide();
      })
    }
    else{
      Toast.hide();
      this.setState({
        isShowModal:true
      })
    }
  }
  getData=(id)=>{
    Toast.loading("加载中...",0)
    getCoursePlay({id:id}, (result)=>{
      let {attachmentList}=result;
      this.changeData(attachmentList);
    });
  }
  getDemoData(id){
    Toast.loading("加载中...",0)
    getCourseDetail({id:id}, (result)=>{
      let {demoAttachmentList}=result;
      this.changeData(demoAttachmentList);
    });
  }
  //切换新的媒体
  changeVideo=(nextIndex)=>{
    let courseType=this.state.listsDate[nextIndex].courseType;
    //每次切换时候都会自动播放
    //切记：setState是异步
    this.setState({
      activeIndex:nextIndex,
      isPlaying:true,
      courseType
    },()=>{
      try{
        if(courseType===1){
          let audioPlay=document.getElementById("audioPlay");
          audioPlay.src=this.getAudioUrl();
          audioPlay.play();
        }
        else if(courseType===7){
          let video=document.getElementById("video");
          video.src=this.getAudioUrl();
          video.play();
        }
      }
      catch(error){
        console.log(error);
      }
    })
  }
  error=()=>{
    Toast.fail("出错了")
  }
  next(){
    let {activeIndex,listsDate}=this.state;
    if( activeIndex+1<listsDate.length){
      this.setState({
        activeIndex:activeIndex+1
      })
    }
  }
  toggleStatus=()=>{
    let {isPlaying}=this.state;
    try{
      let audioPlay=document.getElementById("audioPlay");
      if(!isPlaying){
        audioPlay.play();
      }
      else{
        audioPlay.pause();
      }
      this.setState({
        isPlaying:!isPlaying
      })
    }
    catch(error){
      console.log(error);
    }
  }
  //资源准备好才进入,才会开始倒计时
  startPlay=()=>{
    // this.setState({
    //   isPlaying:true
    // })
    // Toast.loading("加载中..")
    //获取此时的时间戳
    let startTime=Date.parse( new Date());
    this.setState({
      startTime
    })
  }
  componentDidMount() {
    let courseIndex=getLastParam();
    if(courseIndex){
      this.setState({
        activeIndex:Number(courseIndex)
      })
    }

    let id=getLastParam(1);
    //通过URL来判断数据来源
    let url=window.location.href.indexOf("playDemo");
    //开始播放demo页面
    if(url>0){
      this.getDemoData(id);
    }
    else{
      this.getData(id);
    }
    //当音频出现问题，播放不出来的时候
    history.listen((location, action) => {
      Toast.hide();
    })
  }
  //当做计算属性用
  getAudioUrl(){
    let {listsDate,activeIndex}=this.state;
    if(listsDate.length>0){
      try{
        //判断格式是否正确
        let videoUrl=listsDate[activeIndex].attachment;
        let videoType=[".mp3",".mp4",".webm",".ogg"];
        //只要匹配一个就OK了
        let isTrueType=videoType.some((item)=>{
          return videoUrl.indexOf(item)>0
        })
        if(!isTrueType){
          Toast.fail("不支持的媒体格式" ,3,()=>{
          })
          return;
        }
        return videoUrl
      }
      catch(error){
        console.log(error);
      }
    }
  }
  getCurrentTitle(){
    let {listsDate,activeIndex}=this.state;
    if(listsDate.length>0){
      try{
        return listsDate[activeIndex].title;
      }
      catch(error){
        console.log(error);
      }
    }
    else{
      return null;
    }
  }
  //当加载媒介数据时运行脚本
  onloadeddata=()=>{
    if(this.state.isPlaying){
      Toast.loading("加载中...",0)
    }
  }
  //当浏览器开始加载媒体数据时运行
  onloadstart=()=>{
    if(this.state.isPlaying){
      Toast.loading("加载中...",0)
    }
  }
  onpause=()=>{
    //如果是播放状态才出现加载条
    if(this.state.isPlaying){
      Toast.loading("加载中...",0)
    }
  }
  onplaying(){
    Toast.hide()
  }
  ended=()=>{
    let {startTime,totalTime}=this.state;
    //获取当前的时间戳
    let endTime=Date.parse( new Date());
    //播放时长小于8s就是异常
    if((endTime-startTime)/1000<8){
      let audioPlay=document.getElementById("audioPlay");
      audioPlay.currentTime=0
    }
    else{
      Toast.hide();
      this.setState({
        isPlaying:false
      })
    }
  }
  timeupdate=()=>{
    if(timer){
       timer=false
         try{
            let audioPlay=document.getElementById("audioPlay");
            this.setState({currentTime:audioPlay.currentTime})
            if(!isNaN(audioPlay.duration)){
              this.setState({totalTime:audioPlay.duration})
            }
            timer=true;
         }
         catch(err){
           console.log(err);
         }
    }
  }
  //正在浏览器正在读取中。。。---没啥用
  onprogress(){
    // console.log("加载中44");
    // Toast.loading("加载中44...",0)
  }
  render() {
    let {history} = this.props;
    let {listsDate,activeIndex,isPlaying,currentTime,totalTime,courseType,bufferedTime,currentUrl,isShowModal}=this.state;
    let {onChange,onAfterChange,startPlay,changeVideo,toggleStatus,onloadeddata,onplaying,onprogress,onloadstart,onpause,timeupdate,ended}=this;
    //把currentUrl当做计算属性
    currentUrl=this.getAudioUrl();
    let isMusic=courseType === 1;
    let title=this.getCurrentTitle();
    return (
      <div>
        {isMusic  && <Header title={title} history={history} bg={"true"}/>}
        {!isMusic && <Header title={title} history={history}/>}
        <div className={"rel"}>
          {isMusic && <PlayVoiceBox {...{listsDate,activeIndex,isPlaying,currentTime,totalTime,bufferedTime,currentUrl,changeVideo,onChange,onAfterChange,startPlay,toggleStatus,onloadeddata,onplaying,onprogress,onloadstart,onpause,timeupdate,ended}}/>}
          {!isMusic && (<div className={"h200 bg-black fx jcc aic"}>{currentUrl && <video width="100%" controls autoPlay id={"video"} className={"h100p"}><source src={currentUrl} type="video/mp4"/></video>}</div>)}
        </div>

        <div className="blank"/>
         <div className={"ml10 mt30"}>
             <h1 className={"fz18 pb20 bdb1"}>课程目录 </h1>
              {
                listsDate && listsDate.length>0 && listsDate.map((item,index)=>{
                  return  <div key={index} onClick={()=>changeVideo(index)} className={classNames({"blue":index===activeIndex})}>
                    <div className={"df pt15 pb15 bdb1"}>
                      <div className="fx1 fz15 line1">{item.title}</div>
                      <div className={"w40 tar pr10"}>{index===activeIndex && <img src={require("../../static/images/playing.gif")} alt="" className={"w20"}/>}</div>
                    </div>
                  </div>
                })
              }
          </div>
        <div className="blank"/>

        <Modal
          visible={isShowModal}
          transparent
          maskClosable={false}
          onClose={()=>{window.history.back()}}
          title="未找到视频"
          footer={[{ text: '返回上一页', onPress: () => {window.history.back()} }]}
        >
        </Modal>
        <Footer/>
      </div>
    );
  }
}
