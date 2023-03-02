import React, {Fragment} from 'react';
import { Icon,Flex} from 'antd-mobile';
import {Link} from "react-router-dom"

let phone=[
  {
    phone:"010-88888888"
  },
  {
    phone:"010-9999999"
  }
]

export default function IndexPhone() {
  return (
    <div className="p10">
      <Flex justify="between" align="center">
        <Flex>
          <div className={"pr10 mr10"}>
            <img src={require("../../../static/images/jingwu@3X.png")} alt="" style={{height:"0.18rem"}}/>
          </div>
          <div className="grey6 fz12">
            如果遇到紧急情奖品请您联系我们
          </div>
        </Flex>
      </Flex>
      <div className={"df mt15"}>

        {
          phone.map((item,index)=>(
            <Fragment key={index}>
              <div className={"fx1"}>
                <div className={"df jcb aic"}>
                  <span>{item.phone}</span>
                  <a href={`tel:${item.phone}`} className={"bg-grey ptb5 plr10 bdrs10"} style={{color:"#108ee9"}}>拔打</a>
                </div>
              </div>
              {
                index+1!==phone.length &&  <div className={"w40 tac grey"}>|</div>
              }
            </Fragment>
          ))
        }
      </div>
    </div>
  );
}
