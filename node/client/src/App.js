import React, { Component } from 'react';
import { Router, Route } from "react-router"
import { Redirect, Switch } from 'react-router-dom';
import './App.css';
// import { createStore } from 'redux'
// import NotFound from "./container/NotFound/NotFound"
import RouterLists from "./router/RouterLists"
import  "antd-mobile/dist/antd-mobile.min.css"
import './static/css/common.css'
import './static/css/publicGH.css'
import './static/css/publicM.css'
import './static/css/public.css'
import "./static/css/antdEdit.css"
import FooterNav from "./components/FooterNav/FooterNav"
import history from "./utils/history";
import $ from "jquery"
import "./static/js/rem"
import {showFooterNav} from "./enums/enums"
// import {isAliOrWx} from "./utils/common";
// import {getWxOpenId} from "./static/js/getWxOpenId";


class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          showFooterNav:true
        }
    }
    canEnterUrl =()=>{
      let userInfo = localStorage.getItem("userInfo");
      let url = history.location.pathname;
      let isLoginPage = (url !== "/login" && url !== "/reset");
      return !userInfo && isLoginPage
    }
    checkUserLogin=()=>{
      // //判断用户是否登陆
      if(this.canEnterUrl()){
        this.props.history.replace("/login");
      }
    }
    componentWillMount(){
      this.checkUserLogin();
    }
    componentWillUpdate(){
      //一旦用户没登陆了，点击浏览器的返回按钮也回不到上一页；
      this.checkUserLogin();
    }
    showFooterNavFun(){
      let pathname=window.location.pathname;
      let isShow=showFooterNav.some(item=>item===pathname)
      this.setState({
        showFooterNav:isShow
      })
    }
    componentDidMount() {
      this.showFooterNavFun();
      //切换路由后，把之前的滚动事件清除
      history.listen((location, action) => {
          $(window).off("scroll");
          $(window).scrollTop(0);
          this.showFooterNavFun();
      })
      //自动获取openId;
      // if(isAliOrWx()==="wx"){
      //   getWxOpenId();
      // }

    }
    render() {
        let { history } = this.props;
        return (
            <div>
                <Router history={history}>
                   <Switch>
                        {RouterLists.map((item,index)=><Route exact path={item.url} component={item.component} key={index}/>)}
                        {
                          RouterLists.map(item=>
                              item.child.length>0 && item.child.map((item2,index2)=> <Route exact path={item2.url} component={item2.component} key={index2}/>)
                          )
                        }
                        {/*<Redirect to="/404" />*/}
                      </Switch>
                </Router>
                {
                  this.state.showFooterNav && <FooterNav history={history}/>
                }
            </div>
        );
    }
}
export default App;

