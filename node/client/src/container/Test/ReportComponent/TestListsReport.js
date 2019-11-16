/**
 * Created by mqd on ${DATE}.
 */
import React from 'react';
// import {changeNumber} from "../../utils/common"
import { Link } from "react-router-dom";

// 点击事件统计
function tongji() {
  // _hmt.push(['_trackEvent', 'Link', 'click', '详情列表点击']);
}
//代表是否是首页
export default function TestListsReport({ lists, fromshare }) {

  return (
    <div className="bg-white">
      {
        lists && lists.length>0 && lists.map((item,index)=>{
          return (
            <div  key={index}>
              <Link url={fromshare ? `/ceshi/start/${item.id}?fromshare=true` : `/ceshi/start/${item.id}`} className={"w100p db  bdb1"} onClick={tongji}>
                <div className="df ptb15 aie bdb1">
                  <div  className="itemRight mt5 rel db fx1 pr10">
                    <div className="fz15 line2 b pb10" style={{WebkitBoxOrient: "vertical",maxHeight:"0.36rem"}}>{item.name}</div>
                    <div className="fz12 line2 grey pb10" style={{WebkitBoxOrient: "vertical",maxHeight:"0.34rem"}}>{item.tipsTitle}</div>
                    <div className={"c9"} style={{ width:"calc(100% - 20px)"}}>
                      <div className={"df jcb aic fxww"}>
                        <div>
                          {
                            item.price?<span className={"orange fz18 b mr5"}><i className={"fz10 n"}>¥</i>{item.price}</span>:<span className={"fz14 green"}>免费</span>
                          }
                          {
                            (item.price!==0 && item.originalPrice>item.price) && <del className="fz10">¥{item.originalPrice}</del>
                          }
                        </div>

                      </div>
                    </div>
                  </div>
                  <div style={{ width: "1.4rem", height: "0.9rem", backgroundImage: `url(${item.shareImage})`, backgroundSize: "cover", backgroundPosition: "center" }} className={"bdrs5 rel"}>
                    <div className="abs t0 r0 fz10 plr5" style={{backgroundColor: "#FFDD33"}}>
                        {/*{changeNumber(item.visitNum)}人已测过*/}
                        {item.visitNum}人已测过
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )
        })
      }
    </div>
  );
}

