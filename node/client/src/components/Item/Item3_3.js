import React from 'react';
import {Link} from "react-router-dom"
import {loadImage, tagsLimit} from "../../utils/common";
import ImageCenter from "../Layout/ImageCenter"
import PropTypes from "prop-types"
import urlencode from "urlencode"
import { isDev } from "../../config/config"

let propTypes = {
  item:PropTypes.Object
}

let mBaseUrl=isDev==="dev" ? "https://testm.ydl.com" : "https://m.ydl.com";

function autoLoginM(targetUrl){
  let userInfo=localStorage.getItem("userInfo");
  userInfo=JSON.parse(userInfo);
  let {uid,accessToken}=userInfo;
  return `${mBaseUrl}/auth/succ?uid=${uid}&token=${accessToken}&target=${urlencode(targetUrl)}`
}

function Item2_2({item,jumpToM}) {
  // item=item5;
  let mainDetail=(
    <div className={"df mt20 plr15"}>
      <div className={"rel mr10 pt5"}>
        <ImageCenter className={"w65 h65 bdrs5"} img={item.head}/>
      </div>
      <div className={"fx1 bdb1 w100p"}>
        <div className={"df"}>
          <div className={"fx1 mr10"}>
            <div className={"b fz15 pb3 df aic"}>
              <span className={"mr5"}>{item.name}</span>
              <img src={loadImage("ico_zztd@2x.png")} alt="" className={"w15 h15"}/>
            </div>
            <div className={"df jcb aic pb3"}>
              <div className={"line1 fz12 w200"} style={{WebkitBoxOrient: "vertical"}}>
                {item.title}
              </div>
              <span className={"tagBot tac"} style={{backgroundColor:"#e0bb7e",color:"white",width:"0.5rem"}}>
                    持证{item.workYears}年
                  </span>
            </div>

            <div className={"mb20"}>
              <div className={"df mr5"}>
                {
                  item.tags && tagsLimit(item.tags,12,"|").map((item,index)=>(
                    <span className={"tagBot mr5"} key={index}>{item}</span>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
  <div>
    {
      jumpToM ? <a href={autoLoginM(`${mBaseUrl}/experts/${item.doctorId}?from=bg`)} className={"w100p bg-white"} target={"blank"}>
        {mainDetail}
      </a> : <Link to={`/Expert/Detail/${item.doctorId}`} className={"w100p bg-white"}>
        {mainDetail}
      </Link>
    }
  </div>
  )

}

Item2_2.propTypes = propTypes;
export default Item2_2;
