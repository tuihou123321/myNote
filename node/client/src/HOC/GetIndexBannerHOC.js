import React from 'react';
import { getCompanyInfo } from "../api/api"
// import bannerLists from "../mock/commonData/Banner";
import {getCompanyPY} from "../utils/common";
import bannerIndex from "../../src/static/images/bannerIndex.jpg"

const GetIndexBannerHOC = (WrappedComponent) =>
  class WrapperComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        bannerLists:[]
      }
    }
    //获取组件内的值
    componentDidMount(){
      let companyPY=getCompanyPY();
      // Toast.loading("加载中...",0)
      //获取首页数据
      getCompanyInfo({pinyin:companyPY},(result)=>{
        let {cover}=result;
        let bannerLists=[{}]
        bannerLists[0].bannerImageUrl=cover || bannerIndex;
        this.setState({
          bannerLists
        })
      });
    }
    render() {
      return <WrappedComponent {...this.props}  bannerLists={this.state.bannerLists}/>;
    }
  }

export default GetIndexBannerHOC;
