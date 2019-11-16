import React, { Component } from 'react';
import Layout from "../../layout/Layout"
import { Toast } from "antd-mobile"
import BannerNav from "./component/BannerNav"
import Swiper from "swiper/dist/js/swiper"
import SwipeableViews from "react-swipeable-views"
import Item from "../../components/Item/Item"
import Item3_1 from "../../components/Item/Item3_1"
import Item2_1 from "../../components/Item/Item2_1"
import "swiper/dist/css/swiper.min.css"
import "./static/mHome.css"
import ItemWrap from "../../components/ItemWrap/ItemWrap";
import ImageCenter from "../../components/Layout/ImageCenter"
import SmallTxt from "../../components/SmallTxt/SmallTxt"
import {courseChoice,testChoice,getRandomArticle} from  "../../api/api"
import { Link } from "react-router-dom"
import GetIndexBannerHOC from "../../HOC/GetIndexBannerHOC"

const styles = {
  root: {
    padding: '0 1.85rem 0 0',
  },
  slideContainer: {
    padding: '0 5px',
  },
  slide: {
    padding: 5,
    minHeight: "1.85rem",
    color: '#fff',
  },
  slide1: {
    backgroundColor: '#FEA900',
  },
  slide2: {
    backgroundColor: '#B3DC4A',
  },
  slide3: {
    backgroundColor: '#6AC0FF',
  },
};


class mHome extends Component {
  state = {
    courseChoiceLists:[],
    testChoiceLists:[],
    articleLists:[]
  }
  exchangeCourse = (isFirst) => {
    if(!isFirst){
      Toast.loading("加载中...",0)
    }
    courseChoice({},(result)=>{
      this.setState({
        courseChoiceLists:result
      },()=>{
        // this.swiperFun();
        Toast.hide();
      })
    })
  }
  exchangeTest = (isFirst) => {
    if(!isFirst){
      Toast.loading("加载中...",0)
    }
    testChoice({},(result)=>{
      this.setState({
        testChoiceLists:result
      })
      Toast.hide();
    })
  }
  swiperFun=()=>{
    new Swiper('.swiper-container', {
      slidesPerView: 6,
      spaceBetween: 130,
      freeMode: true,
      // pagination: {
      //   el: '.swiper-pagination',
      //   clickable: true,
      // },
    });
  }

  componentDidMount() {
    Toast.loading("加载中...",0);
    this.exchangeCourse("isFirst");
    this.exchangeTest("isFirst");
    let appId=localStorage.getItem("appId");
    getRandomArticle({
      appId,
      count:5
    },(result)=>{
      this.setState({
        articleLists:result
       })
    })
  }

  render() {
    let {courseChoiceLists,testChoiceLists,articleLists}=this.state;
    return (
      <Layout title={"心理自助"} url={"/"}>
        {/*<WingBlank className={"mHome"}>*/}
          {/*<Carousel*/}
            {/*autoplay={false}*/}
            {/*infinite*/}
            {/*beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}*/}
            {/*afterChange={index => console.log('slide to', index)}*/}
          {/*>*/}
            {/*{bannerLists.length>0  && bannerLists.map((item,index) => (*/}
              {/*<a*/}
                {/*key={index}*/}
                {/*href={item.bannerLinkUrl}*/}
                {/*style={{ display: 'inline-block', width: '100%', height: 170 }}*/}
              {/*>*/}
                {/*<img*/}
                  {/*src={item.bannerImageUrl}*/}
                  {/*alt=""*/}
                  {/*style={{ width: '100%', verticalAlign: 'top' }}*/}
                  {/*// onError={e => this.handleError(e)}*/}
                {/*/>*/}
              {/*</a>*/}
            {/*))}*/}
          {/*</Carousel>*/}
        {/*</WingBlank>*/}
        <BannerNav/>
        {/*<div className={"bg-grey"} style={{height:"1.5rem"}}/>*/}
        {
          courseChoiceLists.length>0 &&
            <ItemWrap smallTitle={"课程推荐"} leftTitle={"换一换"} exchange={this.exchangeCourse}>
              <div className={"h180"}>
                <SwipeableViews style={styles.root} slideStyle={styles.slideContainer}>
                  {
                    courseChoiceLists.map((item,index)=>(
                      <Item item={item} key={index} style={{...styles.slide, ...styles.slide1}}/>
                    ))
                  }
                </SwipeableViews>

                {/*<div className="swiper-container">*/}
                  {/*<div className="swiper-wrapper">*/}
                    {/*{*/}
                        {/*courseChoiceLists.length>0 && courseChoiceLists.map((item,index)=>(*/}
                          {/*<Item item={item} key={index}/>*/}
                      {/*))*/}
                    {/*}*/}
                  {/*</div>*/}
                {/*</div>*/}
              </div>
            </ItemWrap>
        }
        <div className="blank"/>

        {
          testChoiceLists.length>0 && <ItemWrap smallTitle={"精选测试"} leftTitle={"换一换"} exchange={this.exchangeTest}>
            <Link to={`/ceshi/start/${testChoiceLists[0].id}`} className={"w100p"}>
             <ImageCenter img={testChoiceLists[0].cover} className={"h140 bdrs5"}>
              <b className={"bg-yellow bdblr5 bdtrr5 abs t0 r0 c1 fz12 ptb2 plr5"}>每日一测</b>
              <div className={"ml20 mt30"}>
                <h2 className={"pb10"}>
                  {testChoiceLists[0].name}
                </h2>
                <div className={"c3 plr10 ptb2 dib fz12 bdrs2"} style={{background:`rgba(255,255,255,.3)`}}>
                  <SmallTxt arr={[`${testChoiceLists[0].hits},人气`,`${testChoiceLists[0].testNum},人已测`]}/>
                </div>
              </div>
            </ImageCenter>
           </Link>
            <div className={"bdb1Wrap"}>
              {
                testChoiceLists.length>0 && testChoiceLists.map((item,index)=>(
                    index>0 && <Item3_1 item={item} key={`A${index}`}/>
                ))
              }
            </div>
          </ItemWrap>
        }

        <div className="blank"/>

        {
          articleLists.length>0 &&
          <ItemWrap smallTitle={"精选文章"} leftTitle={"更多"} url={"/psy"}>
            <div className={"bdb1Wrap"}>
              {
                 articleLists.map((item,index)=>(
                  <Item2_1 item={item} key={`B${index}`}/>
                ))
              }
            </div>
          </ItemWrap>
        }


      </Layout>
    );
  }
}

export default GetIndexBannerHOC(mHome)
