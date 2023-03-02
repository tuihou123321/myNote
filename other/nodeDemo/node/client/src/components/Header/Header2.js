import React, { PureComponent, Fragment } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import "./RightNav.css"
import RouterLists from "../../router/RouterLists"
import { goBack } from "../../static/js/public"
import PropTypes from "prop-types"
import {loadImage} from "../../utils/common";

export default class Header2 extends PureComponent {
  static propTypes={
    url:PropTypes.string,
    right:PropTypes.node,
  }
  state = {
    title:""
  }
  getTitleName=()=>{
    let pathname=window.h.location.pathname;
    if(pathname){pathname=pathname.toLowerCase()}
    let pathArr=pathname.split("/");
    //some方法，return true就会停止循环，提高性能；
      RouterLists.route.some(item=>{
        let url=item.url.toLowerCase();
        if(pathArr.length===4){
          //对pathname进行处理
            pathname="/"+pathArr[1]+"/"+pathArr[2];
          if(url.indexOf(pathname)>-1 && url.indexOf("/:id")>-1){
            //对url进行处理
              url=url.replace("/:id","");
          }
        }
        if(pathname===url){
          this.setState({
              title:item.title
          })
           return true;
        }
      })
  }
  componentDidMount(){
    // this.getTitleName();
  }
  render() {
    let {right,title,url}=this.props;
    let rightDefault=(rightChildren)=>(
      <div className={"df aic"}>
        <a href={"https://dat.zoosnet.net/LR/Chatpre.aspx?id=DAT83236505&amp;lng=cn"} className={"dib"} target={"_blank"}>
          <img src={loadImage(`icon_listen.png`)} alt="" className={"dib p15 wh23 cup"}/>
        </a>
        {rightChildren}
      </div>
    )

    return (
      <Fragment>
        <div className={"fix z100 w100p t0"}>
          <NavBar
              mode="light"
              icon={<Icon type="left" size="lg"/>}
              onLeftClick={() =>goBack(url)}
              rightContent={rightDefault(right)}
          >{title}</NavBar>
        </div>
          <div className={"h45"}/>
      </Fragment>
    );
  }
}
