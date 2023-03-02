import React from 'react';
import { Flex } from 'antd-mobile';
import { Link } from "react-router-dom"
import { loadImage } from "../../utils/common";
import PropTypes from "prop-types"
import _ from "lodash/lang"

let propTypes={
  lists:PropTypes.array
}

let BannerNavLists=(data)=>{
  if(!data){
    return <div/>;
  }
  let lists=_.cloneDeep(data);
  let left=lists.splice(0,1);
  let right=lists.splice(0,2);
  return (
    <div>
      <Flex justify="between" align="baseline">
        <Flex.Item>
          {
            left.map((item,index)=>(
              <Link to={item.url} className="w100p" key={`left${index}`}>
                <img src={loadImage(item.imageName)} alt="" className="w100p"/>
              </Link>
            ))
          }
        </Flex.Item>

        <Flex.Item>
          {
            right.map((item,index)=>(
              <Link to={item.url} className="w100p" style={index!==right.length && {marginBottom:"0.08rem"}}  key={`right${index}`}>
                <img src={loadImage(item.imageName)} alt="" className="w100p"/>
              </Link>
            ))
          }
        </Flex.Item>
      </Flex>
    </div>
  );
}

BannerNavLists.propTypes=propTypes;
export default BannerNavLists;
