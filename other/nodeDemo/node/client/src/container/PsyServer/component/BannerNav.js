import React from 'react';
import {loadImage} from "../../../utils/common"
import classNames from "classname"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"

let propTypes = {
  bannerNavLists: PropTypes.array
}

function BannerNav(bannerNavLists) {
  if(!bannerNavLists){return}
  let length=bannerNavLists.length-1;
  let obj=(item,index)=>(
    <div>
      <div className={"abs t20 lr0 white"}>
        <b className={"fz18"}>{item.title}</b>
        <p className={"fz8 op5"}>{item.desc}</p>
      </div>
      <img src={loadImage(item.imageName)} alt="" style={{height:"1.1rem",width:"1.14rem"}} className={classNames({"bd-style-0":index===0,"bd-style-9":index===length})}/>
    </div>
  )
  return <div className="p10 pb10 df tac jcb">
    {
      bannerNavLists.map((item,index)=>{

        if(item.url.indexOf("http")>-1){
          return  <a className={classNames("fx1 rel")} key={index} href={item.url}>{obj(item,index)}</a>
        }else{
          return  <Link className={classNames("fx1 rel")} key={index} to={item.url}>{obj(item,index)}</Link>
        }
      })
    }
  </div>
}

BannerNav.propTypes = propTypes;
export default BannerNav;
