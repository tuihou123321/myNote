/**
 * Created by mqd on ${DATE}.
 */
import React, { Component } from 'react';
import { Toast} from 'antd-mobile';
import Header from "../../components/Header/Header";
import {getPsyDetail} from "../../api/api"
import {getLastParam} from "../../utils/common";
import UserListsWrap from "../../components/UserListsWrap/UserListsWrap"
import Footer from "../../components/Footer/Footer"

export default class PsyList extends Component {
  state = {
    title:[],
    content:"",
    loading: true
  };
  getDetail(){
    let id=this.props.match.params.id;
    getPsyDetail({id:id},(result)=>{
      let {title,content}=result;
      this.setState({
        title,
        content,
      })
    })
  }
  componentDidMount(){
    this.getDetail();
  }
    render() {
    let {history}=this.props;
    let {title,content}=this.state;
        return (
            <div>
                <Header title="文章详情" history={history} border="true"/>
                 <h1 className={"fz22 c3 tac mb30 mt40 pl20 pr20"}>
                   {title}
                 </h1>
              <div className={"pl15 pr15 pb30 imgWrap"}>
                <div dangerouslySetInnerHTML={{ __html:content}}/>
              </div>
              <div className={"blank"}/>
              <Footer />
            </div>
        );
    }
}
