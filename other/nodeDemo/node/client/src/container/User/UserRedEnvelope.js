/**
 * Created by mqd on ${DATE}.
 */
import React, { Component } from 'react';
import { Button, Tabs, WhiteSpace } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import Header from "../../components/Header/Header";
import classNames from "classname"
import { getUserBalanceLists, getUserDetail, couponMyList, courseCouponMyList } from "../../api/api"
import UserListsWrap from "../../components/UserListsWrap/UserListsWrap"
import $ from "jquery"
import './css/UserRedEnvelope.css';
import { filterTime } from '../../utils/common';
function renderTabBar(props) {
  return (<Sticky>
    {({ style }) => <div style={{ position: 'fixed', width: '100%', top: '45px', zIndex: 100 }}><Tabs.DefaultTabBar {...props} /></div>}
  </Sticky>);
}
const tabs = [
  { title: '红包', id: 1 },
  { title: '兑换券', id: 2 }
];
export default class UserRedEnvelope extends Component {
  state = {
    balance: "0.00",
    loading: true,
    data: [],
    page: 1,
    pageSize: 10,
    RedEnvelopeList: [],
    courseCouponList: [],
    total: null
  }
  componentDidMount() {
    // 获取红包列表
    this.getRedEnvelopeList();
      $(function () {
        $('.zj-coupon-lists').on('click', '.arrow-b', function () {
          console.log(this)
          $(this).hide().next('img').show();
          $(this).parent().parent().parent().next().slideDown();
        })
        $('.zj-coupon-lists').on('click', '.arrow-t', function () {
          $(this).hide().prev('img').show();
          $(this).parent().parent().parent().next().slideUp();
        })
      })
  }
  getRedEnvelopeList() {
    couponMyList({}, (result) => {
      this.setState({
        RedEnvelopeList: result
      })
    })
  }
  getCourseCouponList() {
    courseCouponMyList({}, (res) => {
      console.log(res)
      this.setState({
        courseCouponList: res
      })
    })
  }
  tabClick(tab, index) {
    console.log(tab, index)
    // 0红包 1兑换券
    if (index) {
      this.getCourseCouponList()
    } else {
      this.getRedEnvelopeList()
    }
  }
  toUse(codeType) {
    console.log(codeType)
    // code_type 红包类型1全部业务 2电话倾诉 3预约专家 4 送感谢 5预约红包 6测评红包
    if (codeType == 2) {
      window.location.href = '/confide'
      return false;
    }
    if (codeType == 6) {
      window.location.href = '/ceshi'
    }
  }
  toUseCoupon(courseId) {
    console.log(courseId)
    if (courseId == 0) {
      window.location.href = '/course'
      return false;
    }
    window.location.href = `/course/detail/${courseId}`
  }
  render() {
    let { history } = this.props;
    let { RedEnvelopeList, courseCouponList, balance, loading, total } = this.state;
    console.log(RedEnvelopeList, 3535)
    let canUseHongbao = (status, myOrder, codeType) => {
      // 已过期
      if (myOrder == 3) {
        return <Button className="disabled" inline size="small" style={{ marginRight: '4px' }}>已过期</Button>
      } // 已使用
      if (status == 3) {
        return <Button className="disabled" inline size="small" style={{ marginRight: '4px' }}>已使用</Button>
      }
      return <Button type="primary" inline size="small" style={{ marginRight: '4px' }} onClick={() => { this.toUse(codeType) }}>立即使用</Button>
    }
    let canUseCoupon = (myOrder,courseId) => {
      // 已过期
      if (myOrder == 3) {
        return <div className="icon"></div>
      } // 已使用
      if (myOrder == 2) {
        return <div className="icon2"></div>
      }
      return <div className="button" onClick={() => { this.toUseCoupon(courseId) }}>立即使用</div>
    }
    return (
      <div>
        <Header title="红包" history={history} />
        <StickyContainer>
          <Tabs tabs={tabs}
            initalPage={1}
            renderTabBar={renderTabBar}
            onTabClick={(tab, index) => this.tabClick(tab, index)}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', marginTop: '50px' }}>
              <div className="card_wrapper" style={{ padding: '0 15px' }}>
                {RedEnvelopeList && RedEnvelopeList.length > 0 && RedEnvelopeList.map((item, index) => {
                  return (
                    <div className="myCoupon_card" key={index}>
                      <div className="content">
                        <div className="card_price">¥<span>{(item.couponMoney).split('.')[0]}</span></div>
                        <div className="info" style={{ width: 200, paddingBottom: 10 }}>
                          序号：{item.code}<br />
                          领取：{item.getTime&&filterTime(item.getTime)}<br />
                          使用：{item.useTimeEnd}<br />
                          <div className='line3' style={{ WebkitBoxOrient: "vertical" }}>说明：1.每单限用一张，一次性使用，不找零 2.不可与其它红包叠加使用 3.该红包适用于即时倾诉业务，不可与其他优惠活动同享 4.该红包不可退换，超过有效时间将无法使用 5.同一用户活动期间仅可使用一次，同一手机号、设备、身份证视为同一用户 6.该红包最终解释权归平台所有</div>
                        </div>
                      </div>
                      <div className="actions abs t15 r5">
                        {canUseHongbao(item.status, item.myOrder, item.codeType)}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', marginTop: '50px' }}>
              <div className="zj-coupon-lists">
                {courseCouponList && courseCouponList.length > 0 && courseCouponList.map((item, index) => {
                  return (
                    <div className={classNames("list-box", item.myOrder != 1 ? 'invalid-zj-coupon-lists' : '')}  key={index}>
                      <div className="zj-list">
                        <div className="left">
                          ¥{(item.price).split('.')[0]}</div>
                        <div className="right">
                          <div className="title">
                            课程兑换券
                           </div>
                          {item.expireTime && 
                          <div className="expire">
                            有效期至{filterTime(item.expireTime)}
                          </div>}
                          <div className="rules">
                            <span>使用规则</span>
                            <img className="arrow-b" src="//static.ydlcdn.com/v4/zj/images/ico_more@2x.png" />
                            <img className="arrow-t hide" src="//static.ydlcdn.com/v4/zj/images/ico_more_2@2x.png" />
                          </div>
                          {canUseCoupon(item.myOrder,item.courseId)}
                        </div>
                      </div>
                      <div className="tips hide">
                        <p>1.课程优惠券仅限不大于优惠券金额的课程使用</p>
                        <p>2.每单限用一张，一次性使用，不找零、不折现</p>
                        <p>3.优惠券不可退换，超过有效时间将无法使用</p>
                        <p>4.优惠券最终解释权归平台所有</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </Tabs>
        </StickyContainer>
        {UserListsWrap(loading, total, RedEnvelopeList.length)}
      </div>
    );
  }
}
