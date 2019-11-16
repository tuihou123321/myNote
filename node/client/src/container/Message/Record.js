/**
 * Created by mqd on 2018/6/3.
 */
import React, {Component} from 'react';
import { Toast} from 'antd-mobile';
import Header from "../../components/Header/Header2"
import UserListsWrap from "../../components/UserListsWrap/UserListsWrap"
import {getMyMessageLists,removeMessage} from "../../api/api"
import $ from "jquery"
import MessageTop from "../../components/MessageTop/MessageTop"
import {setDocumentTitle} from "../../static/js/public";


export default class Record extends Component {
    state = {
        lists:[],
        loading:false,
        page:1,
        pageSize:5,
        total:null,
    };
    removeRecord=(id,index)=>{
        Toast.loading("删除中",0);
        removeMessage({id:id},(result)=>{
          let {lists,total}=this.state;
          //删除指定位置的；
          lists.splice(index,1);
          this.setState({
            lists,
            total:total-1
          })
          Toast.hide();
          Toast.success("删除成功")
        })
    }
    scrollLoadMore(){
        $(window).on("scroll",()=>{
            let height = $(document).height()-$(window).height()-$(window).scrollTop();  //页面的高度-显示屏幕的高度-滚动条的高度
            if (height<=20 && !this.state.loading) {
                this.getMore();
            }
        });
    }
    getMore=()=>{
        Toast.loading("加载中",0)
        let {page,pageSize,lists}=this.state;
        if(lists.length>0){++page;}
        let params={page, pageSize}
        this.setState({loading:true})
        getMyMessageLists(params,(result)=>{
            let {list,totalCount}=result;
            lists=lists.concat(list);
            this.setState({
                lists,
                total:totalCount*1,
                page,
                loading:false
            })
            Toast.hide();
        })
    }
    componentDidMount=()=>{
        let pageStateName=window.h.location.pathname.split("/")[1];
        let pageState=window.LStorage.getItem(pageStateName);
        if(pageState){
            let {lists,page,scrollTop}=JSON.parse(pageState);
            this.setState({
                lists,
                page
            },()=>{
                $(window).scrollTop(scrollTop);
            })
        }
        else{
            this.getMore();
        }
        this.scrollLoadMore();
        setDocumentTitle();
    }
    render() {
        let {lists,total,loading,page}=this.state;
        if( total && total<=lists.length){
            $(window).off("scroll");
        }
        return (
            <div className={"bg-grey"}>
                <Header {...{lists,page}} url={"/Message"} title={"留言记录"}/>
                <MessageTop lists={lists} removeRecord={(id,index)=>{this.removeRecord(id,index)}} page={page}/>
                { UserListsWrap(loading,total,lists.length) }
            </div>
        );
    }
}
