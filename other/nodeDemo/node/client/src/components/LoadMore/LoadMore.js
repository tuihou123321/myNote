import React, { Component } from 'react';
import UserListsWrap from "../UserListsWrap/UserListsWrap"
import $ from "jquery"
import PropTypes from "prop-types"

export default class Course extends Component {
  static PropTypes={
    fetchApi: PropTypes.func, //列表数据请求
    ListComponent: PropTypes.node,  //模板
    parmas:PropTypes.object
  }
  state = {
    loading: true,
    data: [],
    page:1,
    pageSize:10,
    listsData:[],
    total:null
  }
  loadMoreFun(){
    $(window).scroll(()=>{
      let height = $(document).height()-$(window).height()-$(window).scrollTop();  //页面的高度-显示屏幕的高度-滚动条的高度
      if (height<=60 && this.state.loading) {
        this.loadMore();
      }
    });
  }
  loadMore=()=>{
    this.setState({loading:false})
    let {page,pageSize}=this.state;
    let param={
      page,
      pageSize
    }
    if(this.props.parmas){
        param={...param,...this.props.parmas}
    }
    this.props.fetchApi(param,(result)=>{
      let {total,list}=result;
      let {listsData}=this.state;
      if(list.length>0){
        ++page;
        //合并两个数组；
        listsData=listsData.concat(list);
      }
      this.setState({
        loading: true,
        listsData,
        page,
        total   //总数量
      });
    });
  }
  componentDidMount() {
    this.loadMore();
  }
  render() {
    this.loadMoreFun();
    let {listsData,total,loading}=this.state;
    //当全部加载完，取消绑定事件
    if( total===listsData.length){
      $(window).off("scroll");
    }
    return (<div className={"bg-white"}>
        {this.props.ListComponent(this.state.listsData)}
        { UserListsWrap(loading,total,listsData.length) }
    </div>);
  }
}
