/**
 * Created by mqd on 2018/6/3.
 */
import React, {Component} from 'react';
import { Toast, WingBlank, Carousel } from 'antd-mobile';
import {getCompanyInfo,getUserDetail,getHomeData} from "../../api/api"
import {getCompanyPY} from "../../utils/common"
// import IndexPhone from "./component/IndexPhone"
import IndexNews from "../../components/IndexNews/IndexNews"
import RecommendedCourse from "../../components/RecommendedCourse/RecommendedCourse"
import RecommendedTest from "../../components/RecommendedTest/RecommendedTest"
import Psy from "./component/Psy"
// import BannerNavLists from "../../components/BannerNavLists/BannerNavListsIndex"
import BannerNavLists from "../../components/BannerNavLists/BannerNavLists";
import Layout from "../../layout/LayoutIndex"
import defaultImg from "../../static/images/100.png"
import { bannerNavData } from "./enums/enums"

export default class Index extends Component {
   state = {
    companyLogo:null,
    banner:"",
    course:[],
    testData:[],
    newLists:[],
    companyName:"",
    bannerLists:[]
  };
   limitLength(lists,maxLength){
     let course=[];
     //避免lists不传导致的错误
     try{
       if(lists.length>maxLength){
         //限制三条
         for(let i=0;i<maxLength;i++){
           course.push(lists[i])
         }
       }
       else{
         course=lists;
       }
     }
     catch(error){
       console.log(error);
     }
     return course;
   }
    componentDidMount(){
      let companyPY=getCompanyPY();
      Toast.loading("加载中...",0)
      //获取首页数据
      getHomeData({},(result)=>{
        let {courseList,testList,helpList}=result;
        let course=this.limitLength(courseList,3);
        let testData=this.limitLength(testList,10);
        this.setState({
          course,
          testData,
          newLists:helpList
        },()=>{
          Toast.hide();
        })
      })

      getCompanyInfo({pinyin:companyPY},(result)=>{
          let { bannerLists }=this.state;
          let {logo,cover,cover2,companyName,webTitle}=result;
          if(!logo){logo=defaultImg;}
          let companyLogo=`<img src=${logo} alt="logo" style="height:0.35rem"/>`;
          cover && (bannerLists[0]={bannerImageUrl:cover});
          cover2 && (bannerLists[1]={bannerImageUrl:cover2});
          this.setState({
              companyLogo,
              // banner:cover,  //一张banner
              bannerLists,
              companyName
          })
          localStorage.setItem("webTitle",webTitle);
      });
      getUserDetail({},(result)=>{
        let {staffName,head}=result;
        localStorage.setItem("username",staffName);
        localStorage.setItem("userHead",head);
        this.setState({
          userName:staffName
        })
      })
    }
    render() {
     let {history} = this.props;
     let {course,testData,newLists,companyLogo,companyName,bannerLists}=this.state;
      if(companyName && companyName.length>12){
        companyName=companyName.substring(0,12)+"...";
      }
        return (
              <Layout {...{companyName,companyLogo,history}}>
                  <WingBlank>
                    <Carousel
                      autoplay={false}
                      infinite
                      beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                      afterChange={index => console.log('slide to', index)}
                    >
                      {bannerLists.length>0 && bannerLists.map((item,index) => (
                        <a
                          key={index}
                          href={item.bannerLinkUrl || "#"}
                          style={{ display: 'inline-block', width: '100%', height: "1.7rem" }}
                        >
                          <img
                            src={item.bannerImageUrl}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' ,minHeight:"1.7rem"}}
                            // onError={e => this.handleError(e)}
                          />
                        </a>
                      ))}
                    </Carousel>
                  </WingBlank>
                    {/*<div style={sectionStyle}>*/}
                        {/*<div style={bannerTxt} className="tac white">欢迎你,{this.state.userName}</div>*/}
                    {/*</div>*/}
                    <div className="p10">
                      {BannerNavLists(bannerNavData)}
                      {/*<BannerNavLists lists={bannerNavData}/>*/}
                    </div>
                  {/*<IndexSupport/>*/}
                  {/*<IndexPhone/>*/}
                  <IndexNews newLists={newLists}/>
                  <div className={"blank"} />
                  <Psy history={history}/>
                  {
                    course.length>0 && <div>
                      <RecommendedCourse coure={course} title="课程推荐" url="/Course"/>
                      <div className={"blank"}/>
                    </div>
                  }
                  {
                    testData.length>0 && <div>
                      <RecommendedTest testData={testData} title="推荐测试" url="/ceshi"/>
                      <div className={"blank"}/>
                    </div>
                  }

              </Layout>
        );
    }
}
