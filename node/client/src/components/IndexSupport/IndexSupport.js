/**
 * Created by mqd on ${DATE}.
 */
import React from 'react';

export default function IndexSupport(){
  return  (
    <div className={"p10 pb20"}>
      <div>
        <span className={"mr5"}>
          <img src={require("../../static/images/jingwu@3X.png")} alt="" style={{height:"0.2rem"}}/>
        </span>
        <span className={"c9"}>
          如果遇到紧急情况请您联系我们
        </span>
      </div>
      <div className={"df pt10"}>
        <div className={"fx1"}>
          <span className={"mr20 fz13 b c3"}>
            0755-22228888
          </span>
          <a href="tel:075588888888"  className={"h20 fz13 bdrs5"} style={{backgroundColor:"#f0f3f5",color:"#84b5db",padding:"0.04rem 0.06rem"}}>
            拨打
          </a>
        </div>

        <div style={{width:"1px",backgroundColor:"#ccc",height:"0.2rem"}}>
        </div>


        <div className={"fx1 tar"}>
          <span className={"mr20 fz13 b c3"}>
            0755-22228888
          </span>
          <a href="tel:075588888888"  className={"h20 fz13 bdrs5"} style={{backgroundColor:"#f0f3f5",color:"#84b5db",padding:"0.04rem 0.06rem"}}>
            拨打
          </a>
        </div>

      </div>
    </div>
  )
}
