/**
 * Created by mqd on ${DATE}.
 */
import React, { Component } from 'react';
import {List} from 'antd-mobile';
import Header from "../../components/Header/Header";
import {getHelpList} from "../../api/api"
import "./Help.css"
import UserListsWrap from "../../components/UserListsWrap/UserListsWrap"
import $ from "jquery"

let Item=List.Item;

export default class Help extends Component {
  state = {
    loading: true,
    data: [],
    page:1,
    pageSize:10,
    listsData:[],
    total:null
  };
  loadMoreFun(){
    $(window).scroll(()=>{
      let height = $(document).height()-$(window).height()-$(window).scrollTop();  //页面的高度-显示屏幕的高度-滚动条的高度
      if (height<=60 && this.state.loading) {
        this.loadMore();
      }
    });
  }
  loadMore(){
    this.setState({loading:false})
    let {page,pageSize}=this.state;
    let param={
      page,
      pageSize,
      // type:0,  //0代表所有
      // isHot:0  //1代表热热门
    }
    getHelpList(param,(result)=>{
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
        return (
            <div>
                <Header title="帮助" history={history}/>
                <List>
                  {
                    listsData.map((item,index)=>{
                      return  <Item extra="" key={index} arrow="horizontal" onClick={() => {history.push(`/help/detail/${item.id}`)}}>{index+1}、{item.title}</Item>
                    })
                  }
                </List>
               { UserListsWrap(loading,total,listsData.length) }
            </div>
        );
    }
}
