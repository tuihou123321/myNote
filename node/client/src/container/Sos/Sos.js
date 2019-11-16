/**
 * Created by mqd on ${DATE}.
 */
import React, { Component } from 'react';
import LoadMoreWrap from "../../components/LoadMoreWrap/LoadMoreWrapSos"
import {getPsyLists,getPsyCategories} from "../../api/api"
import PsyListsIndex from "../../components/PsyListsIndex/PsyListsIndex"
import {loadImage} from "../../utils/common";


export default class Test extends Component {
  state = {
  };
  componentDidMount(){
  }
  render() {
    let url=loadImage("wjgyBanner@3x.png");
    return (
      <LoadMoreWrap
        getLists={getPsyLists}
        getCategories={getPsyCategories}
        banner={(
          <div className={"df mb20"}>
            <div className={"w20"}/>
            <div className={"rel w100p dbrs5 white t15 df jcc aic"} style={{height:"80px",backgroundImage:`url(${url})`,backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center",}}>
                <div className={"fx1 ml20"}>
                  <p className={"fz20"}>0571-28090224</p>
                  <p className={"fz12"}>24小时免费 心理咨询热线</p>
                </div>
                <div className={"fx1 tar mr20"}>
                  <a href="tel:057128090224" className={"button-yellow"}>立即拨打</a>
                </div>
            </div>
            <div className={"w20"}/>
          </div>
        )}
        onlyShowTagName={"危机化解"}
        title={"危机化解"}
        ListsComponentMap={PsyListsIndex}
      />
    );
  }
}
