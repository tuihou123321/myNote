import React, { Component } from 'react';
import Header from "../../components/Header/Header";
import UserTestLists from "../../components/UserTestLists/UserTestLists"
import {getUserTestingLists} from "../../api/api"
import UserListsWrap from "../../components/UserListsWrap/UserListsWrap"
import $ from "jquery"

export default class UserTest extends Component {
  state = {
    loading: true,
    data: [],
    page:1,
    pageSize:10,
    listsData:[],
    total:null
  }
  loadMoreFun(){
    $(window).on("scroll",()=>{
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
    getUserTestingLists(param,(result)=>{
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
    // this.loadMoreFun();
    this.loadMore();
  }
  render() {
    this.loadMoreFun();
    let {history}=this.props;
    let {listsData,total,loading}=this.state;
    //当全部加载完，取消绑定事件
    if( total===listsData.length){
      $(window).off("scroll");
    }
    return (<div>
      <div style={{background:"#f2f5f7"}}>
        <Header title="我的测试" border="true"  history={history}/>

        {UserTestLists(listsData,history)}
        { UserListsWrap(loading,total,listsData.length) }
      </div>
    </div>);
  }
}
