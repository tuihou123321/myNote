import React from 'react';
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import {delHtmlTag} from "../../utils/common"

let propTypes = {
  item:PropTypes.object
}

let item2={
  name:"国际标准抑郁症测试题",
  content:"你的思维方式多容易让你陷入抑郁的深渊？",
  cover:"https://img.ydlcdn.com/file/2019/01/14/cc7fx5mfeyr686zz.jpeg",
  id:5,
}

function Item2_2({item}) {
  // item=item2
  let {id, cover, name, content}=item;
  return (
    <Link to={`/psy/detail/${id}`}  className={"db"}>
      <div className="df pb20 pt20">
        <div className={"mr15"}>
          <div style={{width:"0.9rem",height:"0.9rem",backgroundImage: `url(${cover})`}} className={"bdrs5 bjImageCenter"}/>
        </div>
        <div  className="itemRight mt5 rel db fx1">
          <div className="b fz16 line2" style={{WebkitBoxOrient: "vertical"}}>
            {name}
          </div>
          <div className="line2 fz13 mt5" style={{WebkitBoxOrient:"vertical"}}>
            {delHtmlTag(content)}
          </div>
        </div>
      </div>
    </Link>
  );
}

Item2_2.propTypes = propTypes;
export default Item2_2;
