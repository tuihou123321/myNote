import React from 'react';
import PropTypes from "prop-types"

let propTypes = {}

function SmallTxt({arr=[]}) {
  return (
    arr.map((item,index)=>{
        item=item.split(",");
        return <span className={"mr10"} key={item[0]}><em>{item[0]}</em>{item[1]}</span>
    })
  );
}

SmallTxt.propTypes = propTypes;
export default SmallTxt;
