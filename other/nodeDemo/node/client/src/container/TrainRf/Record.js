/**
 * Created by mqd on 2018/6/3.
 */
import React, {Component} from 'react';
import { Toast} from 'antd-mobile';
import Header from "../../components/Header/Header"
import UserListsWrap from "../../components/UserListsWrap/UserListsWrap"
import {getTrainRfList,deleteTrainRf} from "../../api/api"
import $ from "jquery"
import TrainItem from "../../components/TrainRf/TrainItem"
import {setDocumentTitle} from "../../static/js/public";


export default class Record extends Component {
    state = {
        lists:[],
        loading:false,
        page:1,
        pageSize:10,
        total:null,
    };
  removeRecord=(id,index)=>{
    Toast.loading("删除中",0)
    deleteTrainRf({id:id},(result)=>{
      let {lists,total}=this.state;
      lists.splice(index,1);
      this.setState({
        lists,
        total:--total
      })
      Toast.hide();
      Toast.success("删除成功")
    })
  }
    scrollLoadMore(){
        $(window).on("scroll",()=>{
            let height = $(document).height()-$(window).height()-$(window).scrollTop();  //页面的高度-显示屏幕的高度-滚动条的高度
            if (height<=60 && !this.state.loading) {
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
        getTrainRfList(params,(result)=>{
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
        this.getMore();
        this.scrollLoadMore();
        setDocumentTitle();
    }
    render() {
        let {lists,total,loading}=this.state;
        if( total<=lists.length && total!==null){
            $(window).off("scroll");
        }
        return (
            <main>
                <Header url={"/TrainRf"} title={"我的培训预约"}/>
                <TrainItem lists={lists} removeRecord={(id,index)=>{this.removeRecord(id,index)}}/>
                { UserListsWrap(loading,total,lists.length) }
            </main>
        );
    }
}
