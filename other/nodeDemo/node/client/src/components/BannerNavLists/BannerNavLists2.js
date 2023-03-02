import React from 'react';
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import ImageCenter from "../Layout/ImageCenter"

let propTypes={
  lists:PropTypes.array
}

let BannerNavLists=({data=[]})=>{
  let length=data.length;
  if(length===0){
    return <div/>;
  }
  if(length===1){
    return   <div>
      <img src={data[0].attachment} alt="" className={"w100p"} style={{maxHeight:"1.9rem"}}/>
    </div>
  }
  if(length===2){
    return <div className={"df"}>
      <div className={"fx1"}>
        <ImageCenter className={"w100p"} img={data[0].attachment} style={{height:"1.5rem"}}/>
      </div>
      <div className={"w5"}/>
      <div className={"fx1"}>
        <ImageCenter className={"w100p"} img={data[1].attachment} style={{height:"1.5rem"}}/>
      </div>
    </div>
  }
  else{
    return <div className={"df"}>
      <div className={"fx2"}>
        <ImageCenter className={"w100p"} img={data[0].attachment} style={{height:"1.45rem"}}/>
      </div>
      <div className={"w5"}/>
      <div className={"fx1"}>
        <div className={"mb5"}>
          <ImageCenter className={"w100p"} img={data[1].attachment} style={{height:"0.7rem"}}/>
        </div>
        <div>
          <ImageCenter className={"w100p"} img={data[2].attachment} style={{height:"0.7rem"}}/>
        </div>
      </div>
    </div>
  }
}

BannerNavLists.propTypes=propTypes;
export default BannerNavLists;
