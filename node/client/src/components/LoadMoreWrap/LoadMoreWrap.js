/**
 * Created by mqd on ${DATE}.
 */
import React, { Component } from 'react';
import { Toast} from 'antd-mobile';
import Header from "../../components/Header/Header";
import Nav from "../../components/Nav/Nav"
import UserListsWrap from "../../components/UserListsWrap/UserListsWrap"
import $ from "jquery"
import {setDocumentTitle} from "../../static/js/public";
import PropTypes from "prop-types"

export default class LoadMoreWrap extends Component {
  static propTypes={
    getLists: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    ListsComponentMap: PropTypes.func,
    defaultTagIsFirst: PropTypes.bool,
  }
  state = {
    listsData:[],
    tabs:[],
    page:1,
    pageSize:10,
    loading: true,
    total:null,
    cateId:null
  };
  loadMore=(id)=>{
    this.setState({loading:false})
    let {page,pageSize,cateId}=this.state;
    let param={
      page,
      pageSize,
      cateId:id || cateId,   //类型id
      type:id
    }
    Toast.loading("加载中...",0)
    this.props.getLists(param,(result)=>{
      let {list,total}=result;
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
      Toast.hide();
    },()=>{
      Toast.hide();
    })
  }
  loadMoreFun(){
    $(window).on("scroll",()=>{
      let height = $(document).height()-$(window).height()-$(window).scrollTop();  //页面的高度-显示屏幕的高度-滚动条的高度
      if (height<=60 && this.state.loading) {
        this.loadMore();
      }
    });
  }
  getListsData(id){
    this.setState({
      page:1,
      listsData:[],
      cateId: id
    },()=>{
      this.loadMore(id);
    })
  }
  getCategories(){
    this.props.getCategories({},(result)=>{
      this.setState({
        tabs:result,
        cateId:result[0].id
      },()=>{
        if(this.props.defaultTagIsFirst){
          this.loadMore(result[0].id);
        }
      })
    })
  }
  componentDidMount(){
    if(this.props.getCategories){
      this.getCategories();
    }
    !this.props.defaultTagIsFirst && this.loadMore();
    setDocumentTitle();
  }
  render() {
    this.loadMoreFun();
    let {history}=this.props;
    let {listsData,tabs,loading,total}=this.state;
    //当全部加载完，取消绑定事件
    if( total===listsData.length){
      $(window).off("scroll");
    }
    return (
      <div>
        <Header title={this.props.title} history={history} url={this.props.url}/>
        <Nav tabs={tabs} getListsData={(id)=>this.getListsData(id)}/>
        {this.props.ListsComponentMap(listsData,history)}
        { UserListsWrap(loading,total,listsData.length) }
      </div>
    );
  }
}
