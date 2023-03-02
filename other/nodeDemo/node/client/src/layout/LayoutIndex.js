import React, {Component} from 'react';
import {Link} from "react-router-dom"
import { NavBar } from 'antd-mobile';
import Footer from "../components/Footer/Footer"
import PropTypes from "prop-types"
import { setDocumentTitle } from "../static/js/public";
import {loadImage} from "../utils/common";

let maxTitleLength=12;
export default class Layout extends Component {
  static propTypes={
    title:PropTypes.string,
    children:PropTypes.node
  }
  state = {}
  //设置document title
  componentDidMount() {
    setDocumentTitle();
  }
  render() {
    let {children,companyName,companyLogo,history}=this.props;
    if(companyName && companyName.length>maxTitleLength){
      companyName=companyName.substring(0,maxTitleLength)+".."
    }

    let rightDefault=(img)=>(
      <div className={"df aic"}>
        <a href={"https://dat.zoosnet.net/LR/Chatpre.aspx?id=DAT83236505&amp;lng=cn"} className={"dib"} target={"_blank"}>
          <img src={loadImage(`icon_listen.png`)} alt="" className={"dib p15 wh23 cup"}/>
        </a>
        <Link to="/help"  className={"tar"}>帮助</Link>
      </div>
    )

    return (
      <div className={"indexPage"}>
        <div className={"fix z100 t0 w100p"}>
          <NavBar
            mode="light"
            // icon={<Icon type="left" />}
            icon={<div dangerouslySetInnerHTML={{__html:companyLogo}} className={"bdrs50pWrap"}/>}
            rightContent={rightDefault()}
            onLeftClick={() => history.push("/user")}
            style={{borderBottom:"1px solid #eee"}}
          >{companyName}</NavBar>
        </div>
        <div className={"h45"}/>
        {children}
        <div className="blank"/>
        <Footer/>
      </div>
    );
  }
}
