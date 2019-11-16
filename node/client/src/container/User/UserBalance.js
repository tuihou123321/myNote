/**
 * Created by mqd on ${DATE}.
 */
import React, { Component } from 'react';
import Header from "../../components/Header/Header";
import classNames from "classname"
import {getUserBalanceLists, getUserDetail} from "../../api/api"
import UserListsWrap from "../../components/UserListsWrap/UserListsWrap"
import $ from "jquery"

export default class UserBalance extends Component {
  state = {
    balance:"0.00",
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
  changeFormat(companyMoney){
    companyMoney=companyMoney.toString();
    if(companyMoney.indexOf(".")>0){
      let m0=companyMoney.split(".")[0];
      let m1=companyMoney.split(".")[1];
      let fenshu="";
      if(m1.length>=2){
        fenshu=m1.substring(0,2);
      }
      else{
        fenshu=m1+"0";
      }
      companyMoney=m0+"."+fenshu;
    }
    else{
      companyMoney=companyMoney+".00"
    }
    return companyMoney;
  }
  loadMore=()=>{
    this.setState({loading:false})
    let {page,pageSize}=this.state;
    let param={
      page,
      pageSize
    }
    getUserDetail({},(result)=>{
      let {companyMoney}=result;
      this.setState({
        balance:this.changeFormat(companyMoney)
      })
    })
    getUserBalanceLists(param,(result)=>{
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
    })
  }
  componentDidMount() {
    this.loadMore();
  }
    render() {
        this.loadMoreFun();
        let {history}=this.props;
        let {listsData,balance,loading,total}=this.state;
        //当全部加载完，取消绑定事件
        if( total===listsData.length){
          $(window).off("scroll");
        }
        return (
            <div>
                <Header title="账户余额" history={history} bg="true"/>
                <div>
                    <div style={{background:"#3d9eff"}} className={"p20 pt70"}>
                        <div  style={{color:"#bcddff"}}>
                            账户余额(元)
                        </div>
                        <div className={"white fz50 b"}>
                            {balance}
                        </div>
                    </div>
                </div>
                <div className={"p10 pt5 pb5 bg-grey"}>
                    <div className={"grey fz12"}>
                        收支明细(元)
                    </div>
                </div>
                <div className={"mr15 ml15 bdb1-warp"}>
                      {
                        listsData.map((item, index) => {
                          let dealMoney=item.dealMoney;
                          if (item.dealMoney > 0) {
                             dealMoney = "+" + item.dealMoney;
                          }
                          return   <div className={"pb15 pt10"} key={index}>
                            <div className={"pb5 fz16"}>
                              <span className={"line1 dib  c3 fz15"} style={{width:"2.8rem"}}>{item.fundsTypeName}</span>
                              <span  className={classNames({
                                fr: true,
                                b:true,
                                active: item.dealMoney > 0
                              })}>{dealMoney}</span>
                            </div>
                            <div className={"fz12 c6"}>
                              <span>{item.createTime}</span>
                              <span className={"fr"}>余额：{item.available}</span>
                            </div>
                          </div>
                        })
                      }
                  </div>
                { UserListsWrap(loading,total,listsData.length) }
            </div>
        );
    }
}
