import React from 'react';
import ImageCenter from "../Layout/ImageCenter"
import {delHtmlTag, loadImage} from "../../utils/common";
import { Link } from "react-router-dom"

let propTypes = {}

let item2={
  name:"国际标准抑郁症测试题",
  tipsTitle:"你的思维方式多容易让你陷入抑郁的深渊？",
  shareImage:"https://img.ydlcdn.com/file/2019/01/14/cc7fx5mfeyr686zz.jpeg",
  url:"/psy/detail/10",
  startNumber:"5",
  viewNumber:"100"
}

function Item2_1({item}) {
  // if(!item){
  //   item=item2
  // }
  return (
      <Link to={`/psy/detail/${item.id}`} className={"ptb15 mb15 db"}>
        <div className="df aie pb10">
          <div className="itemRight rel db fx1 pr15 h100">
            <h3 className="line2 b mb15" style={{WebkitBoxOrient: "vertical",maxHeight:"0.5rem"}}>{item.title}</h3>
            <div className="fz14 line2 grey mb15" style={{WebkitBoxOrient: "vertical",maxHeight:"0.4rem"}}>
              {delHtmlTag(item.content)}
            </div>
          </div>
          <ImageCenter img={item.coverUrl || loadImage("100.png")} className={"h100 w140 bdrs5"}/>
        </div>
        {/*<div className={"c9"}>*/}
          {/*<div className={"df jcb aic fxww"}>*/}
            {/*<div>*/}
              {/*<span className={"df aic"}>*/}
                {/*<img src={loadImage("ico_writer@3x.png")} alt="" className={"w15 h15 mr5"}/>*/}
                 {/*<b>小佐</b>*/}
              {/*</span>*/}
            {/*</div>*/}
            {/*<span className={"fz10"}>*/}
                {/*<SmallTxt arr={`["787,收藏",${item.readNum},"人浏览"]`}/>*/}
            {/*</span>*/}
          {/*</div>*/}
        {/*</div>*/}
      </Link>
  );
}

Item2_1.propTypes = propTypes;
export default Item2_1;
