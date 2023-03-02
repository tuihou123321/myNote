import React from 'react';
import ImageCenter from "../Layout/ImageCenter"
import SmallTxt from "../SmallTxt/SmallTxt";
import {Link} from "react-router-dom"

export default function Item({item}) {
  return (
    <Link className={"ptb30 df aic jcb"} to={`/ceshi/start/${item.id}`}>
      <div className={"df mr20 aic"}>
        <ImageCenter img={item.cover} className={"w70 h50 bdrs5 mr15"}/>
        <div>
          <h3 className={"pb5 line1 w200"} style={{WebkitBoxOrient: "vertical"}}>{item.name}</h3>
          <div>
             <SmallTxt arr={[`${item.hits},人气`,`${item.testNum},人已测`]}/>
          </div>
        </div>
      </div>
      <span className={"bg-yellow c3 fz14 b bdrs50p tac df aic p5"}>
        GO
      </span>
    </Link>
  );
}
