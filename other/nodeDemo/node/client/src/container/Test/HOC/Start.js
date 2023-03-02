import React, {Component} from 'react';
import {getHotTest,  getTestDetail, getTestOne} from "../../api/api"
import {Toast} from 'antd-mobile'
import {ErrorFetch} from "../../Components/Index";
import {getLastParam, getParameterByName, goToLogin, isUserLogin, setCookie} from "../../utils/common";
import {getTitlebyId, goToBuy} from "../../utils/public";

const util = require('util')

const HOC = (WrappedComponent) =>
  class WrapperComponent extends Component {
    state = {
      result: {},
      listsData: []
    };
    //获取用户能否测试状态(在前端发起请求，token,uid请求层已经封装)
    getUserCanTest = async () => {
      let {homeId} = this.props;
      let result = await getTestDetail({itemId: homeId});
      return result.hasUnused;
    }
    startTest = async () => {
      let {price,name} = this.props.result || this.state.result;
      let homeId = this.props.homeId;
      if (price === 0) {
        if (this.props.fromshare == "true") {
          window.location.href = `/ceshi/testing/${homeId}?&fromshare=true`;
          return false;
        }
        window.location.href = `/ceshi/testing/${homeId}`;
      }
      else {
        //付费题，没登陆，去登陆
        if (!isUserLogin()) {
          console.log(">>>>>>>>>>>>>>>>>>>>")
          // goToLogin(getFullUrl(this.props.url.asPath));
          goToLogin();
          return false;
        }
        let hasUnused = await this.getUserCanTest();
        // console.log(hasUnused, 898989)
        //付费题 ，登陆了，没支付，去支付
        if (!hasUnused) {
          // 默认跳转
          goToBuy(this.props.url.asPath,price,name);
          return false;
        }
        if (this.props.fromshare == "true") {
          window.location.href = `/ceshi/testing/${homeId}?fromshare=true`;
          return false;
        }
        window.location.href = `/ceshi/testing/${homeId}`;
      }
    }

    //双重保障，如果node层请求失败，客户端会再发起一次请求
    componentDidMount() {
      Toast.loading("加载中...", 0);
      let {homeId} = getLastParam();
      let result = getTestOne({itemId: homeId});
      this.setState({
        result
      })
      Toast.hide();
     }
    render() {
      let {err} = this.props;
      //当返回的的时候next.js生命周期没执行，报错；
      if (err) return <ErrorFetch err={err}/>
      // if (!success || code !== 200) return <NoDataIco ico="i-search" text={msg || '数据获取失败'} />
      return <WrappedComponent {...this.props} {...this.state} listsData={this.props.listsData || this.state.listsData}
                               result={this.props.result || this.state.result} startTest={this.startTest}
                               hasUnused={this.state.hasUnused}/>;
    }
  }

export default HOC;
