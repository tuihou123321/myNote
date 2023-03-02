/**
 * Created by mqd on 2018/6/3.
 */
// import {smallTipsLists} from "./enums/enums"

import React, {Component} from 'react';
import {Toast,Button,WingBlank,WhiteSpace} from 'antd-mobile';
import {Link} from "react-router-dom"
import {getTestDetail,testBuy} from "../../api/api"
import {getLastParam,loadImage} from "../../utils/common"
import BuyModal from "../../components/BuyModal/BuyModal"
import Layout from "../../layout/Layout"
import classNames from "classname"
import NeedToKnow from "./ReportComponent/NeedToKnow"


export default class Start extends Component {
  state = {
    bjImg:"",
    title:"",
    des:"",
    testPeople:"",
    isBuy:false,
    price:0,
    result:{},
    homeId:""
  }
  buySuccessFun=()=>{
    // let {result}=this.state;
    // result.hasUnused=true;
    // this.setState({
    //   result
    // })
    this.getDetail()
  }
  startTest=()=>{
    this.refs.BuyModal.buy();
  }
  componentDidMount(){
    this.getDetail()
  }
  getDetail = () => {
    let homeId=getLastParam();
    Toast.loading("加载中..", 0);
    getTestDetail({id:homeId},(result)=>{
      this.setState({
        result,
        homeId
      })
      Toast.hide();
    },()=>{
      Toast.hide();
    });
  }
  render() {
    let {hasUnused,isCPS,maxCoupon,shareImage, name, desc, visitNum, price=0, questionNumber, originalPrice, tipsTitle, reportPages} = this.state.result;
    let {homeId}=this.state;
    //方法解构
    let {startTest} = this;
    return (
      <div>
        {
          price === 0 ?
            <Layout title="心理测试" border="true" pageTitle={tipsTitle} desc={desc} isCPS={isCPS}>
              <div className="free pt15 pb10" style={{width: "100%", backgroundColor: "#f2f5f7"}}>
                <div className="mauto bg-white" style={{width: "94%"}}>
                  <div className="title h80 pt30 tac">
                    {
                      name && <h3 className={"fz18"}>{name}</h3>
                    }
                    <div className={"p10 tac"}>
                      <div className={"df fz12 c6 tac jcc grey"}>
                        <div className={"fx1 bdr1"}>
                          <div className={"df aic jcc"}>
                            <span>{visitNum}人已测</span>
                          </div>
                        </div>
                        <div className={"fx1"}>
                          <div className={"df aic jcc"}>
                            <span>{questionNumber}道精选题目</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"rel banner tac"}>
                    <img src={shareImage || loadImage("100.png")} alt="" className={"w90p"}/>
                  </div>
                  <div className={"mb10 pt10 pb0"}>
                    <div className={"p15 pt20 pb30"}>
                      <div className={"mb30"}>
                        <div className={"fz13 c3 imgWrap100p c6 lh1-6p sectionWrapWidthZero"}>
                          <div dangerouslySetInnerHTML={{__html: desc}}/>
                        </div>
                      </div>
                    </div>

                    <div className={classNames({tac: true})}>
                      <div className={"tac"}>
                        <div className={"p15 w88p mauto"} style={{marginTop: "-40px"}}>
                          {/* <ButtonX type={"primary"} onClick={this.startTest} className={"fx1"}>立即测试</ButtonX> */}
                          <Link to={`/ceshi/testing/${homeId}`} className={"w100p"}>
                            <WingBlank className="fx7">
                              <Button type="primary" style={{height: "0.5rem", lineHeight: "0.5rem"}}
                                      onClick={startTest}>立即测试</Button><WhiteSpace/>
                            </WingBlank>
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/*<div className={"blank"}/>*/}
                  </div>
                </div>
              </div>
            </Layout>
            : <Layout title="心理测试" border="true" className="mb70 rel" pageTitle={tipsTitle} desc={desc} isCPS={isCPS}>
              <div className="pay rel">
                <div className={"rel banner"}>
                  <img src={shareImage || loadImage("100.png")} alt="" className={"w100p bannerImg"}/>
                </div>
                <div className={"mb10 pt10 pb0"}>
                  <div className={"p10 tac"}>
                    {
                      name && <h3 className={"fz18"}>{name}</h3>
                    }
                    <div className={"fz16 mb10 c3"}>{tipsTitle}</div>
                    <div className={"mb10"}>
                      <b className={"fz20 orange mr5"}>¥{price.toFixed(2)}</b>
                      {originalPrice > price && <del className={"grey"}>¥{originalPrice.toFixed(2)}</del>}
                      {maxCoupon ? <span className="ml10 dib bdrs10 fz12 w100 h20" style={{
                        backgroundColor: "rgb(227, 149, 74)",
                        "color": "#fff"
                      }}>红包再减¥{maxCoupon}.00</span> : <span/>}

                    </div>
                    <div className={"df fz12 c6 tac jcc grey"}>
                      <div className={"fx1"}>
                        <div className={"df aic jcc"}>
                          <img src={loadImage("Shape@2x.png")} alt="" style={{width:"0.12rem",height:"0.12rem"}} className={"mr5"}/>
                          <span>{visitNum}人已测</span>
                        </div>
                      </div>
                      <div className={"fx1 bdr1 bdl1"}>
                        <div className={"df aic jcc"}>
                          <img src={loadImage("title@2x.png")} alt="" style={{width:"0.12rem",height:"0.12rem"}} className={"mr5"}/>
                          <span>{questionNumber}道精选题目</span>
                        </div>
                      </div>
                      <div className={"fx1"}>
                        <div className={"df aic jcc"}>
                          <img src={loadImage("Group@2x.png")} alt="" style={{width:"0.12rem",height:"0.12rem"}} className={"mr5"}/>
                          <span>{reportPages}页专业报告</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"tac"}>
                    <div className={"p15 w88p mauto"}>
                        {
                          hasUnused ? (
                           <Link to={`/ceshi/testing/${homeId}`} className={"w100p"}>
                              <WingBlank className="fx7">
                                <Button type="primary" style={{height: "0.5rem", lineHeight: "0.5rem"}}>
                                      立即测试
                                </Button>
                              </WingBlank>
                            </Link>
                            )
                            : <WingBlank className="fx7">
                                <Button type="primary" style={{height: "0.5rem", lineHeight: "0.5rem"}}
                                      onClick={startTest}>
                                    立即购买
                                </Button>
                              </WingBlank>
                        }
                        <WhiteSpace/>
                    </div>
                  </div>

                  <div className="blank" style={{height: "13px"}}/>

                  <div className={"p15 pt20 pb30"}>
                    <div className={"mb30"}>
                      <h3 className={"pt15 pb10 tac"}>测评介绍</h3>
                      <div className={"fz13 c3 imgWrap100p c6 lh1-6p sectionWrapWidthZero"}>
                        <div dangerouslySetInnerHTML={{__html: desc}}/>
                      </div>
                    </div>
                    <NeedToKnow/>
                  </div>
                </div>
              </div>
            </Layout>
        }
        <BuyModal
          payApi={testBuy}
          applyFee={price}
          buySuccessFun={this.buySuccessFun}
          maxCoupon={maxCoupon}
          ref={"BuyModal"}
        />
      </div>
    );
  }
}


