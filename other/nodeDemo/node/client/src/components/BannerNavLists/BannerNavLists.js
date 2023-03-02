import React,{ Fragment } from 'react';
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

  let rightItem=(item)=>(
    <Fragment>
      <div className={"abs t15 pl15"}>
        <div className={"fz18 mb2 white"}>{item.title}</div>
        <div dangerouslySetInnerHTML={{ __html: item.desc}} className={"fz12 white"}/>
      </div>
      <img src={loadImage(item.imageName)} alt="" className="w100p"/>
    </Fragment>
  )

  return (
    <div className={"white"}>
      <Flex justify="between" align="baseline">
        <Flex.Item>
          {
            left.map((item,index)=>(
              <Link to={item.url} className="w100p rel" key={`left${index}`}>
                <div className={"abs t15 pl15"}>
                  <div className={"fz18 mb20 white"}>{item.title}</div>
                  <div dangerouslySetInnerHTML={{ __html: item.desc}} className={"fz12 white"}/>
                </div>
                <img src={loadImage(item.imageName)} alt="" className="w100p" style={{height:"1.46rem"}}/>
              </Link>
            ))
          }
        </Flex.Item>

        <Flex.Item>
            {
              right.map((item,index)=>{
                if(item.url.indexOf("tel:")>-1){
                  return <a href={item.url} className="w100p rel" style={index!==right.length && {marginBottom:"0.04rem"}}  key={`right${index}`}>
                    {rightItem(item)}
                  </a>
                }else{
                  return <Link to={item.url} className="w100p rel" style={index!==right.length && {marginBottom:"0.04rem"}}  key={`right${index}`}>
                    {rightItem(item)}
                  </Link>
                }
              })
            }
        </Flex.Item>
      </Flex>
    </div>
  );
}

BannerNavLists.propTypes=propTypes;
export default BannerNavLists;
