import React, { Component } from 'react';
import Header from "../../components/Header/Header";
import UserConfideLists from "../../components/UserConfideLists/UserConfideLists"
import {getUserConfideLists} from "../../api/api"
import UserListsWrap from "../../components/UserListsWrap/UserListsWrap"
import $ from "jquery"

export default class UserConfide extends Component {
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
        getUserConfideLists(param,(result)=>{
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
        return (<div>
            <div style={{background:"#f2f5f7"}}>
                <Header title=" 倾诉记录" border="true"  history={history}/>
                {UserConfideLists(this.state.listsData)}
                { UserListsWrap(loading,total,listsData.length) }
            </div>
        </div>);
    }
}
